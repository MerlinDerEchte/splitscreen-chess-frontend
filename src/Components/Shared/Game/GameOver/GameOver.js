import React from 'react';
import './GameOver.scss';
import isKingAttacked from '../../../../Model/GameLogic/isKingAttacked';
import Colors from '../../constants/Colors';
function GameOver(props) {

 
    return (
        <div className="game-over-overlay">
            <div className="game-over-container">
                <span> Game Over </span>
                <span>{isKingAttacked(props.Board)
                    ?
                    (props.Board.turn === Colors.WHITE 
                    ? 
                    'Black' 
                    : 
                    
                    'White') + ' won'
                :

                'Remis'}</span>
            </div>
        </div>
    )
}

export default GameOver;