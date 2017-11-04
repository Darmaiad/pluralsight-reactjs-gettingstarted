import React from 'react';
import { Button } from 'react-bootstrap';

const GameIsDone = (props) => {
    const handleClick = () => props.resetGame();
    
    return (
        <div className="text-center">
            <h2>{props.gameIsDoneStatus}</h2>  
            <Button
                    bsStyle="primary"
                    onClick={handleClick}
            >
                Play Again
            </Button>          
        </div>
    );
}

export default GameIsDone;