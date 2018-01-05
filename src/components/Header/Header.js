import React from 'react';
import { Row, Button } from 'react-bootstrap';
import './Header.css';

var FontAwesome = require('react-fontawesome');
// Since Alertify does not export ES6 modules but node modules 
var alertify = require('alertifyjs');
alertify.set('notifier','position', 'bottom-center');


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = Header.initialState(this.props, this.handleTimer);
    }
    
    static initialState = (properties, initTimer) => ({
        seconds: properties.seconds,
        timerButton: 
            <Button
                bsStyle="primary"
                className="pull-right header-button"
                onClick={initTimer}
                disabled={false}
            >
                Start Game <FontAwesome name='hourglass' />
            </Button>,
        limbo: false,
        alertWaitingTimeSecs: 2,
    });

    componentWillReceiveProps(nextProps) {
        // This condition will reset game after 'Start Game' button is clicked
        if (nextProps.status === null && this.state.limbo) {
            this.setState( Header.initialState(this.props, this.handleTimer) )
        }
        // This condition will freeze header until 'Start Game' button is clicked
        if (nextProps.status !== null ) {
            clearInterval(this.interval);
            this.setState( prevState => ({
                timerButton: 
                    <Button
                        bsStyle="danger"
                        className="pull-right header-button"
                        disabled={true}
                    >
                        {prevState.seconds > 10 ? '0:' + prevState.seconds : '0:0' + prevState.seconds }
                    </Button>,
                limbo: true,
            }));
        }                    
    }

    handleTimer = () => {        
        alertify.success('<strong>Game Started <i class="fa fa-play"></i></strong>', this.state.alertWaitingTimeSecs);
        this.setState(prevState => ({
                seconds: prevState.seconds - 1,
            }), () => {this.timer();});
    };

    handleSetTimeOut = () => {
        alertify.error('<strong>Time Ran Out <i class="fa fa-stop"></i></strong>', this.state.alertWaitingTimeSecs);
        this.props.setTimeRanOut();
        clearInterval(this.interval);
    }

    timer = () => {
        this.props.startGame();
        this.interval = setInterval( () => {

            if (this.state.seconds > 45) {
                this.setState( prevState => ({
                    seconds: prevState.seconds - 1,
                    timerButton:
                        <Button
                            bsStyle="primary"
                            className="pull-right header-button"
                            disabled={true}
                        >
                            0:{this.state.seconds} <FontAwesome name='hourglass-start'/>
                        </Button>
                }));
            }
            else if (this.state.seconds > 15) {
                this.setState( prevState => ({
                    seconds: prevState.seconds - 1,
                    timerButton:
                    <Button
                        bsStyle="warning"
                        className="pull-right header-button"
                        disabled={true}
                    >
                        0:{this.state.seconds} <FontAwesome name='hourglass-half'/>
                    </Button>
                }));
            }
            else if (this.state.seconds > 9) {
                this.setState( prevState => ({
                    seconds: prevState.seconds - 1,
                    timerButton:
                        <Button
                            bsStyle="danger"
                            className="pull-right header-button"
                            disabled={true}                           
                        >
                            0:{this.state.seconds} <FontAwesome name='hourglass-end'/>
                        </Button>
                }));
            }
            else if (this.state.seconds >= 0) {
                this.setState( prevState => ({
                    seconds: prevState.seconds - 1,
                        timerButton:
                        <Button
                            bsStyle="danger"
                            className="pull-right header-button"
                            disabled={true}                            
                        >
                            0:0{this.state.seconds} <FontAwesome name='hourglass-end'/>
                        </Button>
                }));
            }
            else {
                this.setState( prevState => ({
                    timerButton:
                        <Button
                            bsStyle="danger"
                            className="pull-right header-button"
                            disabled={true}
                        >
                            No more time <FontAwesome name='hourglass-o'/>
                        </Button>,
                    limbo: true,
                }), this.handleSetTimeOut());
            }
        }, 1000)
    }

    render() {
        return (
            <div>
                <Row className="header-row">
                    <h3 className="pull-left custom-header">Play Nine9</h3>
                    {this.state.timerButton}
                </Row>
                <hr className="header-line" />
            </div>
        );
    }
}