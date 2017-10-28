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
            randomNumberOfStars: 1 + Math.floor(Math.random()*9),
        };
    }

    selectNumber = (clickedNumber) => {
        // We need to ensure that once we have clicked a number, we cannot click it again
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return; // aka: do nothing
        }

        this.setState( prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    }

    unselectNumber = (clickedNumber) => {

        this.setState( prevState => ({
            // To remove a number from an array, filter it away
            // filter() creates a new array with all elements that pass the test implemented by the provided function
            selectedNumbers: prevState.selectedNumbers
                .filter( number => number !== clickedNumber)
        }));
    }

    render() {
        // We use state variables many time so we can destructure them from the state object
        const {selectedNumbers, randomNumberOfStars } = this.state;
        return (
            <Grid>
                <h3>Play Nine9</h3>
                <hr />
                <Row>
                    <Stars 
                        numberOfStars = {randomNumberOfStars}
                    />
                    <GameButton selectedNumbers = {selectedNumbers}  />
                    <Answer
                        selectedNumbers = {selectedNumbers} 
                        unselectNumber = {this.unselectNumber} 

                    />
                </Row>
                <Numbers 
                    selectedNumbers = {selectedNumbers} 
                    selectNumber = {this.selectNumber}
                />
            </Grid>
        );
    }
}