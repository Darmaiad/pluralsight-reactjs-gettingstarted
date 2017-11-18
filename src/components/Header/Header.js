import React from 'react';
import { Row, Button } from 'react-bootstrap';
import './Header.css';

var FontAwesome = require('react-fontawesome');

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
                Start Game
            </Button>,
        limbo: false,
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
        this.setState(prevState => ({
                seconds: prevState.seconds - 1,
            }), this.timer);
    };

    handleSetTimeOut = () => {
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
                            disabled={false}
                        >
                            0:{this.state.seconds}
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
                        disabled={false}
                    >
                        0:{this.state.seconds}
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
                        >
                            0:{this.state.seconds}
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
                        >
                            0:0{this.state.seconds}
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
                            No more time
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