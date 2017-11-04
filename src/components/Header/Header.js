import React from 'react';
import { Row, Button } from 'react-bootstrap';
import './Header.css';

var FontAwesome = require('react-fontawesome');

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 59,
            timerBtnValue: <span>Start Game <FontAwesome name="hourglass-start" /> </span>,
            
        }
    }

    

    timer = () => {
        
        setInterval( () => {
            this.setState(prevState =>({
            // timerBtnValue: <span> 0:{seconds--} <FontAwesome name="hourglass-start" /> </span>,
            timerBtnValue: <span>{prevState.seconds} <FontAwesome name="hourglass-start" /> </span>,
            seconds: prevState.seconds = prevState.seconds - 1,
            })); 
    }, 1000)};

    render() {
        return (
            <div>
                <Row className="header-row">
                    <h3 className="pull-left custom-header">Play Nine9</h3>
                    <Button
                        bsStyle="primary"
                        className="pull-right header-button"
                        onClick={this.timer}
                    >
                        {this.state.timerBtnValue}
                    </Button>
                    

                </Row>
                <hr className="header-line" />
            </div>
        );
    }
}