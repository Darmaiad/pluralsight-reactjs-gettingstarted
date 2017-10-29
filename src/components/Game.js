import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import './Game.css';
import GameButton from './GameButton/GameButton';
import Stars from './Stars/Stars';
import Answer from './Answer/Answer';
import Numbers from './Numbers/Numbers';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedNumbers: [],
            randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
            answerIsCorrect: null,
            usedNumbers: [],
        };
    }

    selectNumber = (clickedNumber) => {
        // We need to ensure that once we have clicked a number, we cannot click it again
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return; // aka: do nothing
        }

        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerIsCorrect: null,          
        }));
    }

    unselectNumber = (clickedNumber) => {

        this.setState(prevState => ({
            // To remove a number from an array, filter it away
            // filter() creates a new array with all elements that pass the test implemented by the provided function
            selectedNumbers: prevState.selectedNumbers
                .filter(number => number !== clickedNumber),

            answerIsCorrect: null,
        }));
    }

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce(
                (acc, number) => acc + number, 0
            ),
        }));
    };
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
        }));
    };

    render() {

        console.log(this.state)
        // We use state variables many time so we can destructure them from the state object
        const { 
            usedNumbers,
            selectedNumbers, 
            randomNumberOfStars, 
            answerIsCorrect 
        } = this.state;

        return (
            <Grid>
                <h3>Play Nine9</h3>
                <hr />
                <Row>
                    <Stars
                        numberOfStars={randomNumberOfStars}
                    />
                    <GameButton
                        selectedNumbers={selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={answerIsCorrect}
                        acceptAnswer={this.acceptAnswer}
                    />
                    <Answer
                        selectedNumbers={selectedNumbers}
                        unselectNumber={this.unselectNumber}
                    />
                </Row>
                <Numbers
                    selectedNumbers={selectedNumbers}
                    selectNumber={this.selectNumber}
                    usedNumbers={usedNumbers}
                />
            </Grid>
        );
    }
}