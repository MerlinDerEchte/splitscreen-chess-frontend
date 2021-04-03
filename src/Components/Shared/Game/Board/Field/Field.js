import React from 'react';
import './Field.scss';
import Types from '../../../../../Model/GameLogic/Types';
import getPieceImage from '../../../getPieceImage';





function Field(props) {

    const piece = props.Board.getPieceByPosition(props.fieldNumber);
    const pieceImage = piece ? getPieceImage(piece.type, piece.color) : '';


   
  

    return (
        <div className={
            props.isKingInDanger
                ?
                'field attacked-king'
                :
                Math.floor(props.fieldNumber / 8) % 2 === 0
                    ?
                    props.fieldNumber % 2 === 0
                        ?
                        'field black-field'
                        :
                        'field white-field'
                    :
                    props.fieldNumber % 2 === 0
                        ?
                        'field white-field'
                        :
                        'field black-field'
        }>
        {
                props.fieldNumber === props.selectedField && (props.playerColor === props.Board.turn || props.rotateColor) 
                    ?
                    <div className="selected-field"></div>
                    :
                    props.selectedFieldPossibleTargets
                        ?
                        props.selectedFieldPossibleTargets.includes(props.fieldNumber) && (props.playerColor === props.Board.turn || props.rotateColor)
                            ?
                            <div className="possible-move-field"></div>
                            :
                            ''
                        :
                        ''
            }
            <div
                id={`${props.playerColor}-${props.fieldNumber}-piece-image`}
                className={
                    piece
                        ?
                        props.rotateColor === piece.color
                            ?
                            'piece-container rotated-image'
                            :
                            'piece-container'
                        :
                        ''}>
                         {pieceImage}
            </div>
        </div>
    )
}

export default Field;