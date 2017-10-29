import React from 'react';
//import _ from 'lodash';
import range from 'lodash/range';
import { Panel } from 'react-bootstrap';
import './Numbers.css';

const Numbers = (props) => {

    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used-number';
        }
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected-number';
        }
    }

    /*Instead of creating arrayOfNumbers every time we render the component
    we can place it as a property in the Numbers object, because
    every function is an object (we will name it list)/
    const arrayOfNumbers = range(1, 10); */
    return (
        <Panel className="text-center">
            {Numbers.list.map((number, i) => 
                <span 
                    key={i} 
                    className={`numbers-span ${numberClassName(number)}`}
                    // The onClick needs a function reference not a function call
                    // so we do it with an arrow function that returns the call
                    onClick = {() => props.selectNumber(number)} 
                >
                    {number}
                </span>
            )}
        </Panel>
    );
}
Numbers.list = range(1, 10);

export default Numbers;