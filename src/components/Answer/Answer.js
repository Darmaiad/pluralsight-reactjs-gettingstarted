import React from 'react';
import { Col } from 'react-bootstrap';

const Answer = (props) => {
    return (
        <Col md={5} >   
            {props.selectedNumbers.map( (number, i) => 
                <span 
                    key={i}  
                    className="numbers-span"
                    onClick = { () => props.unselectNumber(number) }
                >
                    {number}
                </span>                            
            )}

        </Col>
    );
}

export default Answer;