import React from 'react';
import './GameOver.scss';
import Colors from '../../constants/Colors';
function GameOver(props){

    
    return(
        <div className="game-over-overlay">
            <div className="game-over-container">
                <span> Game Over </span>
                <span>{props.Board.turn === Colors.WHITE ? 'Black' : 'White'} won</span>
            </div>
        </div>
    )
}

export default GameOver;