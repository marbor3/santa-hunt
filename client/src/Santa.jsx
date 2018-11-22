import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Santa = styled.div`
  height: 100vh;
  display: flex;
  background-color: rgb(218, 230, 237);
`;

const Icon = styled.img`
  max-width: 50vw;
  width: 100%:
`;

const SantaProfession = (props) => {
  const { checkAnswers, isCorrect } = props;
  const answerOne = React.createRef();
  const answerTwo = React.createRef();

  const sendAnswers = () => {
    checkAnswers({
      answerOne: parseInt(answerOne.current.value, 10),
      answerTwo: parseInt(answerTwo.current.value, 10),
    });
  };

  return (
    <Santa>
      <Icon alt="" src="../media/icon/028-santa-claus.svg" />
      <div>
        <div>
          <label htmlFor="answer-1">
            Answer 1:
            <input id="answer-1" type="text" ref={answerOne} />
          </label>
        </div>
        <div>
          <label htmlFor="answer-2">
            Answer 2:
            <input id="answer-2" type="text" ref={answerTwo} />
          </label>
        </div>
        <div>
          <button type="button" onClick={sendAnswers}>Submit your answers</button>
        </div>
      </div>
      {isCorrect && (
        <div>
          It is correct!
        </div>
      )}
    </Santa>
  );
};

SantaProfession.propTypes = {
  checkAnswers: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool.isRequired,
};

export default SantaProfession;
