import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import range from 'lodash/range';
import './Game.css';
import GameButton from './GameButton/GameButton';
import Stars from './Stars/Stars';
import Answer from './Answer/Answer';
import Numbers from './Numbers/Numbers';
import GameIsDone from './GameIsDone/GameIsDone';
import Header from './Header/Header';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = Game.initialState();
    }

    static calcRandomNoOfStars = () => 1 + Math.floor(Math.random() * 9);

    static initialState = () => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.calcRandomNoOfStars(),
        answerIsCorrect: null,
        usedNumbers: [],
        availableRedraws: 5,
        gameIsDoneStatus: null,
    });

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
            randomNumberOfStars: Game.calcRandomNoOfStars(),
        }), this.updateGameIsDoneStatus);
        /* So, the above code: setState calls calls are asynchronous. so we cannot assume that they will return in the order we called them.
        The setState method allows a second argument that is a callback function that React will execute when it done
        updating the state.
        */
    };

    redraw = () => {
        if (this.state.availableRedraws === 0) { return };
        this.setState(prevState => ({
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.calcRandomNoOfStars(),
            availableRedraws: prevState.availableRedraws - 1,
        }), this.updateGameIsDoneStatus);
    };

    // The method will receive a state object as an arg but it will destructure it to use the fields it needs   
    possibleWaysToWin = ({ randomNumberOfStars, usedNumbers }) => {
        /* We need to calculate the numbers that are available.
        We will initialize an array will all the possible numbers (1..9) 
        and then filter out the used ones. 
        Actually filter in the ones that are not in the usedNumbers array */
        const possibleNumbers = range(1, 10).filter(
            number => usedNumbers.indexOf(number) === -1
        );

        return this.possibleCombinationSum(possibleNumbers, randomNumberOfStars );
    }

    updateGameIsDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { gameIsDoneStatus: "You actually played this game enough to win. Wow! Nice..." };
            }
            if ((prevState.availableRedraws === 0) && (!this.possibleWaysToWin(prevState))) {
                return { gameIsDoneStatus: "You lost. Because you suck." };
            }
        });
    };

    possibleCombinationSum = function (arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    };

    resetGame = () => this.setState(Game.initialState());
    
    render() {
        // We use state variables many time so we can destructure them from the state object
        const {
            usedNumbers,
            selectedNumbers,
            randomNumberOfStars,
            answerIsCorrect,
            availableRedraws,
            gameIsDoneStatus,
        } = this.state;

        return (
            <Grid>
                <Header />
                <Row>
                    <Stars
                        numberOfStars={randomNumberOfStars}
                    />
                    <GameButton
                        selectedNumbers={selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={answerIsCorrect}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        availableRedraws={availableRedraws}
                    />
                    <Answer
                        selectedNumbers={selectedNumbers}
                        unselectNumber={this.unselectNumber}
                    />
                </Row>
                {gameIsDoneStatus ?
                    <GameIsDone
                        gameIsDoneStatus={gameIsDoneStatus}
                        resetGame={this.resetGame}
                    />
                    :
                    <Numbers
                        selectedNumbers={selectedNumbers}
                        selectNumber={this.selectNumber}
                        usedNumbers={usedNumbers}
                    />
                }
            </Grid>
        );
    }
}