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
  width: 100%;
`;

const Answers = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Answer = styled.div`
  padding: 10px;
`;

const AnswerInput = styled.input`
  font-size: 24px;
  border: 2px solid #000000;
  padding: 10px 20px;
  background-color: ${props => props.inputBgColor || '#ffffff'};
  color: ${props => props.inputColor || '#ffffff'};
  text-align: center;
`;

const Button = styled.button`
  font-size: 24px;
  background-color: rgb(159, 214, 97);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  margin-top: 30px;
  max-width: 300px;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const Message = styled.div`
  padding: 10px;
  font-size: 80px;
  color: #00AEEF;
  text-align: center;
`;

const SantaProfession = (props) => {
  const {
    checkAnswers, message, reset,
  } = props;
  const answerOne = React.createRef();
  const answerTwo = React.createRef();
  const answerThree = React.createRef();
  const answerFour = React.createRef();
  const answerFive = React.createRef();

  const sendAnswers = () => {
    checkAnswers({
      answerOne: parseInt(answerOne.current.value, 10),
      answerTwo: parseInt(answerTwo.current.value, 10),
      answerThree: parseInt(answerThree.current.value, 10),
      answerFour: parseInt(answerFour.current.value, 10),
      answerFive: parseInt(answerFive.current.value, 10),
    });
  };

  return (
    <Santa>
      <Icon alt="" src="../media/icon/028-santa-claus.svg" />
      {message && (
        <Messages>
          <Message>{message}</Message>
          <Button type="button" onClick={reset}>Reset</Button>
        </Messages>
      )}

      {!message && (
        <Answers>
          <Answer>
            <AnswerInput type="text" ref={answerOne} inputBgColor="#079F49" />
          </Answer>
          <Answer>
            <AnswerInput type="text" ref={answerTwo} inputBgColor="#ED1C24" />
          </Answer>
          <Answer>
            <AnswerInput type="text" ref={answerThree} inputColor="#247BA0" inputBgColor="#FBB040" />
          </Answer>
          <Answer>
            <AnswerInput type="text" ref={answerFour} inputColor="#FBB040" inputBgColor="#00AEEF" />
          </Answer>
          <Answer>
            <AnswerInput type="text" ref={answerFive} inputBgColor="#92278F" />
          </Answer>
          <Button type="button" onClick={sendAnswers}>Sprawdź!</Button>
        </Answers>
      )}
    </Santa>
  );
};

SantaProfession.propTypes = {
  checkAnswers: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string,
};

SantaProfession.defaultProps = {
  message: null,
};

export default SantaProfession;
