const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");

require("dotenv").config();
const Data = require("./data");
const sockets = {};

const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const router = express.Router();

// this is our MongoDB database
const dbRoute = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`;

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  sockets[id].emit('background-color', 'lime');
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete({_id: id }, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use(express.static(path.join(__dirname, "../client", "build")))

// append /api for our http requests
app.use("/api", router);

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('msg', 'a user connected');

  let data = new Data();
console.log(socket.id);
  data.message = socket.id;
  data.id = socket.id;
  data.save(err => {
  });

  sockets[socket.id] = socket;

  socket.on('disconnect', function(){
    console.log('user disconnected');

    const { id } = socket;
    Data.findOneAndDelete({id: id }, err => {
    });

    delete sockets[socket.id];

  });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});


// launch our backend into a port
http.listen(process.env.PORT, () => console.log(`LISTENING ON PORT ${process.env.PORT}`));
