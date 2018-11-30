import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import ProfessionChooser from './ProfessionChooser';
import Santa from './Santa';
import Tree from './Tree';
import {
  PROFESSION, SANTA, GIFT, TREE,
} from './profession';

const BASE_IMG = '../media/icon/045-tree-1.svg';
const GIFT_SOLVED_IMG = '../media/icon/reindeer-gift.svg';
const TREE_SOLVED_IMG = '../media/icon/reindeer-tree.svg';

const SOLVED_MSG = 'Brawo, udało się Wam! Szukajcie teraz wśród reniferów tego z czerwonym nosem!';
const FAILED_MSG = 'Niestety, pomyliliście się!';

class App extends Component {
  constructor() {
    super();

    this.state = {
      profession: null,
      isCorrect: false,
      mystery: null,
    };

    this.socket = null;
    this.selectProfession = profession => this.selectProfessionAction.bind(this, profession);
    this.checkAnswers = this.checkAnswers.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillMount() {
    const storedProfession = localStorage.getItem(PROFESSION) || '{"profession":null}';
    const { profession } = JSON.parse(storedProfession);

    this.setState({
      profession,
    });
  }

  componentDidMount() {
    const { profession } = this.state;
    this.socket = io();

    this.socket.on('MYSTERY_SOLVED', () => {
      this.setState({
        mystery: 'SOLVED',
      });
    });

    this.setProfession(profession);
  }

  componentWillUpdate(nextProps, nextState) {
    const { profession } = this.state;

    if (profession !== nextState.profession) {
      this.setProfession(profession);
    }
  }

  setProfession(profession) {
    if (this.socket) {
      this.socket.emit('profession', profession);
    }
  }

  selectProfessionAction(profession) {
    this.setState({
      profession,
    });

    const storedProfession = {
      profession,
    };

    localStorage.setItem(PROFESSION, JSON.stringify(storedProfession));
  }

  checkAnswers(answers) {
    axios.post('/santa/verify', {
      answers,
    }).then((response) => {
      const { isCorrect } = response.data;
      const message = isCorrect ? SOLVED_MSG : FAILED_MSG;

      this.setState({
        isCorrect,
        message,
      });
    });
  }

  reset() {
    this.setState({
      isCorrect: null,
      message: null,
    });
  }

  isSolved() {
    const { mystery } = this.state;

    return mystery === 'SOLVED';
  }

  render() {
    const {
      profession, isCorrect, mystery, message,
    } = this.state;

    switch (profession) {
      case SANTA: {
        return (
          <Santa
            checkAnswers={this.checkAnswers}
            reset={this.reset}
            isCorrect={isCorrect}
            mystery={mystery}
            message={message}
          />
        );
      }
      case GIFT: {
        const image = this.isSolved() ? GIFT_SOLVED_IMG : BASE_IMG;

        return <Tree image={image} />;
      }
      case TREE: {
        const image = this.isSolved() ? TREE_SOLVED_IMG : BASE_IMG;

        return <Tree image={image} />;
      }

      default: {
        return <ProfessionChooser selectProfession={this.selectProfession} />;
      }
    }
  }
}

export default App;
