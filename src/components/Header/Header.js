import React from 'react';
import { Row, Button } from 'react-bootstrap';
import './Header.css';

var FontAwesome = require('react-fontawesome');

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: this.props.seconds,
            timerButton: this.props.startingButton,
            // <Button
            //     bsStyle="primary"
            //     className="pull-right header-button"
            //     onClick={this.handleTimer}
            //     disabled={false}
            // >
            //     Start Game
            // </Button>,
        }

        this.state.timerButton.addEventListener("click", this.handleTimer);
        
    }


    // static initialState = () =>

    //     ({
    //         seconds: 59,
    //         timerBtnValue: 'Start Game',
    //         timerBtnStyle: 'primary',
    //         timerBtnDisabled: false,
    //         icon: 'gamepad',
    //         countdown: true,
    //         //timerBtnStyle: this.props.btnColor,
    //     });

    handleTimer = () => {
        this.setState(prevState => ({
                seconds: prevState.seconds - 1,
            }), this.timer);
    };

    handleSetTimeOut = () => {
        this.props.setTimeRanOut();
        clearInterval(this.interval);
        console.log("setTimeOut handled");
    }

    // resetGame = () => {
    //     this.setState(Header.initialState());
    // }

    timer = () => {
        this.interval = setInterval(() => {

            // this.setState(prevState => ({
            //     seconds: prevState.seconds - 1,
            // }));


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
                console.log("Time finished");
                this.setState( prevState => ({
                    timerButton:
                        <Button
                            bsStyle="danger"
                            className="pull-right header-button"
                            disabled={true}
                        >
                            No more time
                        </Button>
                }), this.handleSetTimeOut());
            }
        }, 1000)
    }



    // let timer = () => {
    //     setInterval(() => {
    //         this.setState(prevState => {
    //             if (this.state.timerBtnValue === 'No Time') {
    //                 console.log("stahp!");

    //             }
    //             else if (this.state.seconds > 45) {
    //                 return {
    //                     timerBtnValue: <span>0:{prevState.seconds}  </span>,
    //                     seconds: prevState.seconds = prevState.seconds - 1,
    //                     icon: 'hourglass-start',
    //                     //timerBtnStyle: 'primary',                            
    //                 };
    //             }
    //             else if (this.state.seconds > 15) {
    //                 return {
    //                     timerBtnValue: <span>0:{prevState.seconds}  </span>,
    //                     seconds: prevState.seconds = prevState.seconds - 1,
    //                     icon: 'hourglass-half',
    //                     timerBtnStyle: 'warning',
    //                 };
    //             }
    //             else if (this.state.seconds > 9) {
    //                 return {
    //                     timerBtnValue: <span>0:{prevState.seconds}  </span>,
    //                     seconds: prevState.seconds = prevState.seconds - 1,
    //                     icon: 'hourglass-end',
    //                     timerBtnStyle: 'danger',
    //                 };
    //             }
    //             else if (this.state.seconds > 0) {
    //                 return {
    //                     timerBtnValue: <span>0:0{prevState.seconds}  </span>,
    //                     seconds: prevState.seconds = prevState.seconds - 1,
    //                 };
    //             }
    //             else {
    //                 this.handleSetTimeOut();
    //                 return {
    //                     timerBtnValue: 'No Time',
    //                     seconds: -1,
    //                     icon: '',
    //                     timerBtnStyle: 'danger',
    //                     timerBtnDisabled: true,
    //                     countdown: false,

    //                 };
    //             }
    //         })
    //     }, 1000)
    // };

    render() {
        return (
            <div>
                <Row className="header-row">
                    <h3 className="pull-left custom-header">Play Nine9</h3>
                    {/* <Button
                bsStyle={this.state.timerBtnStyle}
                className="pull-right header-button"
                onClick={this.handleTimer}
                disabled={this.state.timerBtnDisabled}
            >

                <span>{this.state.timerBtnValue} <FontAwesome name={this.state.icon} /></span>
            </Button> */}

                    {this.state.timerButton}
                </Row>
                <hr className="header-line" />
            </div>
        );
    }
}

