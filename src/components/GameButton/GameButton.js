import React from 'react';
import { Button, Col } from 'react-bootstrap';

const GameButton = (props) => {
    return (
        <Col md={2} >
            <Button
                bsStyle="primary"
                disabled={false}
            >
                =
            </Button>
        </Col>
    );
}

export default GameButton;
