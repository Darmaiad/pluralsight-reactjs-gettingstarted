import React from 'react';
import { Col } from 'react-bootstrap';
import range from 'lodash/range';
import './Stars.css';

var FontAwesome = require('react-fontawesome');

const Stars = (props) => {
    
    const numberOrStars = 1 + Math.floor(Math.random()*9);
    let stars = [];
    stars = range(numberOrStars).map( i => 
        <FontAwesome
            key={i}
            name='star'
            className='game-stars'
        />
    );

    return (
        <Col md={5} >
            {stars}            
        </Col>
    );
}

export default Stars;
