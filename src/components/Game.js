import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import './Game.css';
import GameButton from './GameButton/GameButton';
import Stars from './Stars/Stars';
import Answer from './Answer/Answer';
import Numbers from './Numbers/Numbers';

export default class Game extends React.Component {
    render() {
        return (
            <Grid>
                <h3>Play Nine9</h3>
                <hr />
                <Row>
                    <Stars />
                    <GameButton />
                    <Answer />
                </Row>
                <Numbers />
            </Grid>
        );
    }
}