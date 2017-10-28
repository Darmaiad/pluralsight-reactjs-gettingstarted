import React from 'react';
import { Button, Col } from 'react-bootstrap';

const GameButton = (props) => {
    return (
        <Col md={2} >
            <Button
                bsStyle="primary"
                disabled={props.selectedNumbers.length === 0}
            >
                =
            </Button>
        </Col>
    );
}

export default GameButton;
