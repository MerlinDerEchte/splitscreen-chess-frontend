import React from 'react';
import './pawnDevelopment.scss'
import Types from '../../../../../Model/GameLogic/Types';
import Colors from '../../../../../Model/GameLogic/Colors';
import getPieceImage from '../../../getPieceImage';

function PawnDevelopment(props) {

   

    const bishopIMG = props.Board.turn === Colors.WHITE ? getPieceImage(Types.BISHOP, Colors.WHITE) : getPieceImage(Types.BISHOP, Colors.BLACK);
    const knightIMG =  props.Board.turn === Colors.WHITE ? getPieceImage(Types.KNIGHT, Colors.WHITE) : getPieceImage(Types.KNIGHT, Colors.BLACK);
    const queenIMG = props.Board.turn === Colors.WHITE ? getPieceImage(Types.QUEEN, Colors.WHITE) : getPieceImage(Types.QUEEN, Colors.BLACK);
    const rookIMG = props.Board.turn === Colors.WHITE ? getPieceImage(Types.ROOK, Colors.WHITE) : getPieceImage(Types.ROOK, Colors.BLACK);
    
    return (
        props.playerColor === props.Board.turn || props.rotateColor
        ?
        <div className={props.rotateColor === props.Board.turn ? "pawn-development-overlay pawn-development-overlay-rotated" : "pawn-development-overlay"}>
            <div className="selection-container">
                <div className="selection-item" id={`${props.Board.turn}-bishop-selection`}>
                    {bishopIMG}
                </div>
                <div className="selection-item" id={`${props.Board.turn}-knight-selection`}>
                    {knightIMG}
                </div>
                <div className="selection-item" id={`${props.Board.turn}-queen-selection`}>
                    {queenIMG}
                </div>
                <div className="selection-item" id={`${props.Board.turn}-rook-selection`}>
                    {rookIMG}
                </div>
            </div>
        </div>
        :
        ''
    )
}

export default PawnDevelopment;