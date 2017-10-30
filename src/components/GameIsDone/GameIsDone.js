import React from 'react';
import { Button } from 'react-bootstrap';


const GameIsDone = (props) => {
    
    return (
        <div className="text-center">
            <h2>{props.gameIsDoneStatus}</h2>  
            <Button
                    bsStyle="primary"
                    onClick={props.resetGame}
            >
                Play Again
            </Button>          
        </div>
    );
}

export default GameIsDone;