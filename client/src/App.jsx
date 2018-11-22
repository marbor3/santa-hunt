import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ProfessionChooser from './ProfessionChooser';
import Santa from './Santa';
import Gift from './Gift';
import Tree from './Tree';
import {
  PROFESSION, SANTA, GIFT, TREE,
} from './profession';

class App extends Component {
  constructor() {
    super();

    this.state = {
      profession: null,
      isCorrect: false,
    };

    this.selectProfession = profession => this.selectProfessionAction.bind(this, profession);
    this.checkAnswers = this.checkAnswers.bind(this);
  }

  componentWillMount() {
    const profession = localStorage.getItem(PROFESSION) || null;

    this.setState({
      profession,
    });
  }

  componentDidMount() {
    this.getDataFromDb();

    var socket = io();

    socket.on('msg', function (msg) {
      const newNode = document.createElement('div');
      newNode.innerHTML = msg;
    });

    socket.on('background-color', function (msg) {
      document.body.style.backgroundColor = msg;
    });
  }

  getDataFromDb() {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  }

  putDataToDB(message) {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };

  deleteFromDB(idTodelete) {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  updateDB(idToUpdate, updateToApply) {
    axios.post("/api/updateData", {
      id: idToUpdate,
      update: { message: updateToApply }
    });
  };

  selectProfessionAction(profession) {
    this.setState({
      profession,
    });

    localStorage.setItem(PROFESSION, profession);
  }

  checkAnswers(answers) {
    let isCorrect = true;

    if (answers.answerOne !== 1) {
      isCorrect = false;
    }

    if (answers.answerTwo !== 2) {
      isCorrect = false;
    }

    this.setState({
      isCorrect,
    });
  }

  render() {
    const { profession, isCorrect } = this.state;

    switch (profession) {
      case SANTA: { return <Santa checkAnswers={this.checkAnswers} isCorrect={isCorrect} />; }
      case GIFT: { return <Gift />; }
      case TREE: { return <Tree />; }

      default: {
        return <ProfessionChooser selectProfession={this.selectProfession} />;
      }
    }
  }
}

export default App;
