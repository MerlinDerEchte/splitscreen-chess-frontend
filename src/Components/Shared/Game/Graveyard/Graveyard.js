
import React from 'react';
import Types from '../../../../Model/GameLogic/Types';
import getPieceImage from '../../getPieceImage';
import './Graveyard.scss';

function Graveyard(props) {
    return (
        <div className="graveyard-container">
            {   
                props.Board.graveyardPieces.filter((piece) => piece.color !== props.playerColor)
                .sort((a,b) =>{
                    console.log(a.type)
                    switch(a.type){
                        default: return 0;
                        case Types.PAWN: {
                            switch(b.type){
                                default: 
                                case Types.PAWN: return 0;
                                case Types.KNIGHT: return -1;
                                case Types.BISHOP: return -1;
                                case Types.ROOK : return -1;
                                case Types.QUEEN: return -1;
                            }
                        }
                        case Types.KNIGHT: {
                            switch(b.type){
                                default: 
                                case Types.PAWN: return 1;
                                case Types.KNIGHT: return 0;
                                case Types.BISHOP: return -1;
                                case Types.ROOK : return -1;
                                case Types.QUEEN: return -1;
                            }
                        }

                        case Types.BISHOP: {
                            switch(b.type){
                                default: 
                                case Types.PAWN: return 1;
                                case Types.KNIGHT: return 1;
                                case Types.BISHOP: return 0;
                                case Types.ROOK : return -1;
                                case Types.QUEEN: return -1;
                            }
                        }

                        case Types.ROOK: {
                            switch(b.type){
                                default: 
                                case Types.PAWN: return 1;
                                case Types.KNIGHT: return 1;
                                case Types.BISHOP: return 1;
                                case Types.ROOK : return 0;
                                case Types.QUEEN: return -1;
                            }
                        }

                        case Types.QUEEN: {
                            switch(b.type){
                                default: 
                                case Types.PAWN: return 1;
                                case Types.KNIGHT: return 1;
                                case Types.BISHOP: return 1;
                                case Types.ROOK : return 1;
                                case Types.QUEEN: return 0;
                            }
                        }
                    }
                })
                .map((piece, index) => {
                        return (
                            <div key = {index} className="graveyard-item">
                                {getPieceImage(piece.type, piece.color)}
                            </div>)
                    })
            }
        </div>
    )
}
export default Graveyard;


