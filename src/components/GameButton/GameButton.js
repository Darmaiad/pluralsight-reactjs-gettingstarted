import React from 'react';
import { Button, Col } from 'react-bootstrap';
import './GameButton.css';

var FontAwesome = require('react-fontawesome');

const GameButton = props => {
  let gameButton;
  //console.log(props);
  switch (props.answerIsCorrect) {
    case true:
      gameButton = (
        <Button bsStyle="success" onClick={props.acceptAnswer}><FontAwesome name="check" /></Button>
      );
      break;

    case false:
      gameButton = (
        <Button bsStyle="danger"><FontAwesome name="times" /></Button>
      );
      break;

    default:
      gameButton = (
        <Button bsStyle="primary" disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}
          className="equalsign-size"
        >
          =
        </Button>
      );
      break;
  }
  return (
    <Col md={2} className="text-center">
      {gameButton}
      <br />
      <br />
      <div>
        <Button
          bsStyle="warning"
          bsSize="xsmall"
          onClick={props.redraw}
          disabled={props.availableRedraws === 0 || props.gameFinished}
        >
          <FontAwesome name="refresh" /> {props.availableRedraws}
        </Button>
      </div>
      <br />
    </Col>
  );
};

export default GameButton;
