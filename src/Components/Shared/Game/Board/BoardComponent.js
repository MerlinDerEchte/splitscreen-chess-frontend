import React, { useState, useEffect } from 'react';
import Colors from '../../../../Model/GameLogic/Colors';
import Field from './Field/Field';
import './BoardComponent.scss';
import PawnDevelopment from './PawnDevelopment/PawnDevelopment'
import GameOver from '../GameOver/GameOver';
import isKingAttacked from '../../../../Model/GameLogic/isKingAttacked';
import isValidMove from '../../../../Model/GameLogic/isValidMove';
import getPieceMoves from '../../../../Model/GameLogic/getPieceMoves';
import Types from '../../../../Model/GameLogic/Types'



function BoardComponent(props) {

    const [selectedField, setSelectedField] = useState(null);
    const [selectedFieldPossibleTargets, setSelectedFieldPossibleTargets] = useState([]);
    const fields = new Array(64).fill(null);


    const kingAttacked = isKingAttacked(props.Board);
    const kingPosition = props.Board.getKing(props.Board.turn).getPosition();

    useEffect(() => {

        setSelectedField(null);
        setSelectedFieldPossibleTargets([]);

    }, [props.Board]);

    function selectPawnDevelopment() {
        return new Promise((resolve, reject) => {

            document.getElementById(`${props.Board.turn}-bishop-selection`).addEventListener('click', () => {
                resolve(Types.BISHOP)
            });
            document.getElementById(`${props.Board.turn}-knight-selection`).addEventListener('click', () => {
                resolve(Types.KNIGHT)
            });
            document.getElementById(`${props.Board.turn}-queen-selection`).addEventListener('click', () => {
                resolve(Types.QUEEN)
            });
            document.getElementById(`${props.Board.turn}-rook-selection`).addEventListener('click', () => {
                resolve(Types.ROOK)
            });
        })
    }



    async function moveToSelectedField(nextMove) {
        if (nextMove.piece.type === Types.PAWN &&
            (nextMove.targetPosition < 8 || nextMove.targetPosition > 55)) {

            document.getElementsByClassName('pawn-development-overlay')[0].style.display = "block";
            nextMove.piece.type = await selectPawnDevelopment();
            document.getElementsByClassName('pawn-development-overlay')[0].style.display = "none";
        }
        props.move(nextMove)

    }

    function unselectField() {
        setSelectedField(null);
        setSelectedFieldPossibleTargets([]);

    }


    //if move is executed by pointerdown + pointermove : pass selected position as selectedPosition,
    // if field is only clicked set selectedField and selectedFieldPossibleTargets in state for the next click

    function pointerDownField(e, pointerType) {
        console.log(e)

    
        e.stopPropagation();
        e.preventDefault();
        e.cancelBubble = true;
        const selectedPosition = getMousePositionField(e);
        let newSelectedFieldPossiblePositions;
        console.log(selectedPosition)

        if (props.Board.turn === props.playerColor || props.rotateColor) {

            console.log('in here');
            const pieceOnClickedField = props.Board.getPieceByPosition(selectedPosition);
            console.log(pieceOnClickedField)

            if (pieceOnClickedField && pieceOnClickedField.color === props.Board.turn) {

                const pieceMoves = getPieceMoves(pieceOnClickedField, props.Board)
                newSelectedFieldPossiblePositions = pieceMoves.filter(move => {

                    return (isValidMove(move, props.Board))

                }).map(m => {

                    return m.targetPosition
                });

                setSelectedField(selectedPosition);
                setSelectedFieldPossibleTargets(newSelectedFieldPossiblePositions)
                const boardContainer = document.getElementById(`board-${props.playerColor}`);
                //document.addEventListener('mousemove', movePieceImage, false);
                if (pointerType === "mouse") {
                    boardContainer.addEventListener('mousemove', movePieceImage, false);
                    boardContainer.addEventListener('mouseup', pointerUpField, false);
                }
                if (pointerType === "touch") {
                    console.log('adding rouch listener')
                    boardContainer.addEventListener('touchmove', movePieceImage, false);
                    boardContainer.addEventListener('touchend', pointerUpField, false);

                }
                //document.addEventListener('mouseup', pointerUpField, false);

            } else if (selectedField || selectedField === 0) {

                if (selectedFieldPossibleTargets.includes(selectedPosition)) {


                    const pieceOnSelectedField = props.Board.getPieceByPosition(selectedField);
                    const possibleMoves = getPieceMoves(pieceOnSelectedField, props.Board);
                    console.log(props.Board)
                    console.log(pieceOnSelectedField);
                    console.log(possibleMoves);
                    const nextMove = possibleMoves.find(move => move.targetPosition === selectedPosition)

                    if (nextMove) {

                        unselectField();
                        moveToSelectedField(nextMove)

                    } else {
                        unselectField();
                    }
                }else{
                    unselectField();
                }
            } else {
                unselectField();
            }
        }



        function movePieceImage(e) {
            console.log('movepiece', e);
            e.preventDefault();
            e.stopPropagation();
            const boardContainer = document.getElementById(`board-${props.playerColor}`);
            const pieceIMG = document.getElementById(`${props.playerColor}-${selectedPosition}-piece-image`);
            const boardOffset = boardContainer.getBoundingClientRect();

            const pieceWidth = (boardContainer.clientWidth / 8) * 1.5;

            const xOnViewport = pointerType === "mouse" ? e.clientX : e.changedTouches[0].clientX;
            const yOnViewport = pointerType === "mouse" ? e.clientY : e.changedTouches[0].clientY;
            const mouseX = xOnViewport > boardOffset.left
                ?
                xOnViewport < boardOffset.right ?
                    xOnViewport - (pieceWidth / 2)
                    :
                    boardOffset.right - (pieceWidth / 2)
                :
                boardOffset.left - (pieceWidth / 2);
            const mouseY = yOnViewport > boardOffset.top
                ?
                yOnViewport < boardOffset.bottom
                    ?
                    yOnViewport - (pieceWidth / 2)
                    :
                    boardOffset.bottom - (pieceWidth / 2)
                :
                boardOffset.top - (pieceWidth / 2)
                ;

            pieceIMG.style.position = 'fixed';
            pieceIMG.style.top = `${mouseY}px`;
            pieceIMG.style.left = `${mouseX}px`;
            pieceIMG.style.zIndex = 200;
            pieceIMG.style.height = `${pieceWidth}px`;
            pieceIMG.style.width = `${pieceWidth}px`;

        }

        function getMousePositionField(e) {
            const boardContainer = document.getElementById(`board-${props.playerColor}`);

            const leftBorder = boardContainer.getBoundingClientRect().left;
            const topBorder = boardContainer.getBoundingClientRect().top;
            const rightBorder = boardContainer.getBoundingClientRect().right;
            const bottomBorder = boardContainer.getBoundingClientRect().bottom;
            const xOnViewport = pointerType === "mouse" ? e.clientX : e.changedTouches[0].clientX;
            const yOnViewport = pointerType === "mouse" ? e.clientY : e.changedTouches[0].clientY;
            const boardContainerWidth = rightBorder - leftBorder;
            const boardContainerHeight = bottomBorder - topBorder;
            const col = props.rotateColor
                ?
                props.firstBoard === Colors.WHITE
                    ?
                    Math.floor(((xOnViewport - leftBorder) / boardContainerWidth) * 8)
                    :
                    Math.floor(((rightBorder - xOnViewport) / boardContainerWidth) * 8)
                :
                props.playerColor === Colors.WHITE
                    ?
                    Math.floor(((xOnViewport - leftBorder) / boardContainerWidth) * 8)
                    :
                    Math.floor(((rightBorder - xOnViewport) / boardContainerWidth) * 8);
            const row = props.rotateColor
                ?
                props.firstBoard === Colors.WHITE
                    ?
                    Math.floor(((bottomBorder - yOnViewport) / boardContainerHeight) * 8)
                    :
                    Math.floor(((yOnViewport - topBorder) / boardContainerHeight) * 8)
                :
                props.playerColor === Colors.WHITE
                    ?
                    Math.floor(((bottomBorder - yOnViewport) / boardContainerHeight) * 8)
                    :
                    Math.floor(((yOnViewport - topBorder) / boardContainerHeight) * 8);
            return col + row * 8;

        }

        function pointerUpField(e) {
            console.log("in pointer up")
            const fieldNumber = getMousePositionField(e);
            const boardContainer = document.getElementById(`board-${props.playerColor}`);
            // document.removeEventListener('mousemove', movePieceImage, false);
            if (pointerType === "mouse") {
                boardContainer.removeEventListener('mousemove', movePieceImage, false);
                boardContainer.removeEventListener('mouseup', pointerUpField, false);
            }

            if (pointerType === "touch") {
                boardContainer.removeEventListener('touchmove', movePieceImage, false);
                boardContainer.removeEventListener('touchend', pointerUpField, false);
            }

            // document.removeEventListener('mouseup', pointerUpField, false);
            const pieceIMG = document.getElementById(`${props.playerColor}-${selectedPosition}-piece-image`);

            if (props.Board.turn === props.playerColor || props.rotateColor) {


                if (selectedPosition || selectedPosition === 0) {

                    if (newSelectedFieldPossiblePositions.includes(fieldNumber)) {

                        const pieceOnSelectedField = props.Board.getPieceByPosition(selectedPosition);
                        const possibleMoves = getPieceMoves(pieceOnSelectedField, props.Board);
                        const nextMove = possibleMoves.find(move => move.targetPosition === fieldNumber)

                        if (nextMove) {
                            unselectField();
                            pieceIMG.style.display = 'none';
                            const pieceFade = setTimeout(() => {
                                pieceIMG.style = null;
                            }, 200);
                            moveToSelectedField(nextMove);

                        } else if (selectedPosition !== fieldNumber) {
                            pieceIMG.style = null;
                            unselectField();
                        } else {
                            pieceIMG.style = null;
                            unselectField();
                        }
                    } else {
                        pieceIMG.style = null;
                    }
                } else {
                    pieceIMG.style = null;
                }
            }

        }
    }



    return (

        <div className={
            props.rotateColor
                ?
                props.firstBoard === Colors.WHITE
                    ?
                    "game-container"
                    :
                    "game-reverse-container"
                :

                props.playerColor === Colors.WHITE
                    ?
                    props.Board.turn === Colors.WHITE
                        ?
                        "game-container game-container-to-move"
                        :

                        "game-container"
                    :
                    props.Board.turn === Colors.BLACK
                        ?
                        "game-reverse-container game-container-to-move"
                        :
                        "game-reverse-container"
        }
            id={`board-${props.playerColor}`}
            onTouchStart={e => pointerDownField(e, "touch")}
            onMouseDown={e => pointerDownField(e, "mouse")}

        >
            {props.Board.isGameOver ? <GameOver Board={props.Board} /> : ''}

            <PawnDevelopment
                playerColor={props.playerColor}
                Board={props.Board}
            />
            {
                fields.map((field, index) => (
                    <Field
                        rotateColor={props.rotateColor}
                        selectedField={selectedField}
                        setSelectedField={setSelectedField}
                        selectedFieldPossibleTargets={selectedFieldPossibleTargets}
                        setSelectedFieldPossibleTargets={setSelectedFieldPossibleTargets}
                        fieldNumber={index}
                        move={props.move}
                        playerColor={props.playerColor}
                        Board={props.Board}
                        isKingInDanger={kingAttacked && kingPosition === index} />
                ))
            }

        </div>
    )
}

export default BoardComponent;