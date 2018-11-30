require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Data = require('./data');

const sockets = {};
const router = express.Router();

// this is our MongoDB database
const dbRoute = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`;

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true },
);

const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.post('/verify', (req, res) => {
  let isCorrect = true;
  const { answers } = req.body;

  if (answers.answerOne !== 17) {
    isCorrect = false;
  }

  if (answers.answerTwo !== 324) {
    isCorrect = false;
  }

  if (answers.answerThree !== 56) {
    isCorrect = false;
  }

  if (answers.answerFour !== 100) {
    isCorrect = false;
  }

  if (answers.answerFive !== 257) {
    isCorrect = false;
  }

  if (isCorrect) {
    io.emit('MYSTERY_SOLVED');
    // Object.values(sockets).forEach((socket) => {
    //   socket.socket.emit('MYSTERY', 'SOLVED');
    // });
  }

  return res.json({ isCorrect });
});

app.use(express.static(path.join(__dirname, '../client', 'build')));
app.use('/santa', router);

io.on('connection', (socket) => {
  const data = new Data();

  data.message = socket.id;
  data.id = socket.id;
  data.save();

  sockets[socket.id] = { socket, profession: null };

  socket.on('profession', (profession) => {
    sockets[socket.id].profession = profession;
  });

  socket.on('disconnect', () => {
    const { id } = socket;
    Data.findOneAndDelete({ id });
    delete sockets[socket.id];
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});


// launch our backend into a port
http.listen(process.env.PORT, () => console.log(`LISTENING ON PORT ${process.env.PORT}`));
