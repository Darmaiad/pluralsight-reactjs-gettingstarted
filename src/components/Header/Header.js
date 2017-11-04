import React from 'react';
import { Row, Button } from 'react-bootstrap';
import './Header.css';

var FontAwesome = require('react-fontawesome');

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 59,
            timerBtnValue: 'Start Game',
            timerBtnStyle: 'primary',
            timerBtnDisabled: false,
            icon: 'gamepad',
        }
    }

    timer = () => {
        setInterval( () => {
            this.setState( prevState => {
                if (this.state.seconds > 45) {
                    return {
                        timerBtnValue: <span>0:{prevState.seconds}  </span>,
                        seconds: prevState.seconds = prevState.seconds - 1,
                        icon: 'hourglass-start',
                        timerBtnStyle: 'primary',                            
                    };
                }
                else if (this.state.seconds > 15) {
                    return {
                        timerBtnValue: <span>0:{prevState.seconds}  </span>,
                        seconds: prevState.seconds = prevState.seconds - 1,
                        icon: 'hourglass-half',
                        timerBtnStyle: 'warning',
                    };
                }
                else if (this.state.seconds > 9) {
                    return {
                        timerBtnValue: <span>0:{prevState.seconds}  </span>,
                        seconds: prevState.seconds = prevState.seconds - 1, 
                        icon: 'hourglass-end',
                        timerBtnStyle: 'danger',
                    };
                }       
                else if (this.state.seconds > 0) {
                    return {
                        timerBtnValue: <span>0:0{prevState.seconds}  </span>,
                        seconds: prevState.seconds = prevState.seconds - 1, 
                    };
                } 
                else {
                    return {
                        timerBtnValue: 'No Time',
                        seconds: 0, 
                        icon: '',
                        timerBtnStyle: 'danger',
                        timerBtnDisabled: true,
                    };
                }      
        })
    }, 1000)};

    render() {
        return (
            <div>
                <Row className="header-row">
                    <h3 className="pull-left custom-header">Play Nine9</h3>
                    <Button
                        bsStyle={this.state.timerBtnStyle}
                        className="pull-right header-button"
                        onClick={this.timer}
                        disabled={this.state.timerBtnDisabled}
                    >
                        
                        <span>{this.state.timerBtnValue} <FontAwesome name={this.state.icon} /></span>
                    </Button>
                    

                </Row>
                <hr className="header-line" />
            </div>
        );
    }
}