import './SplitscreenGame.scss';
import React, { useState, useEffect } from 'react';
import Settings from './Settings/Settings';
import BoardComponent from '../Shared/Game/Board/BoardComponent';
import Graveyard from '../Shared/Game/Graveyard/Graveyard';
import Colors from '../../Model/GameLogic/Colors';
import makeMove from '../../Model/GameLogic/makeMove';
import StatusDisplay from '../Shared/Game/StatusDisplay/StatusDisplay';
import newGameFactory from '../../Model/GameLogic/newGameFactory';
import Board from '../Shared/Game/Board/BoardComponent';
import undoMove from  '../../Model/GameLogic/undoMove'
function SplitscreenGame(props) {

    const [activePieces, setActivePieces] = useState([]);
    const [activePiecesHistory, setActivePiecesHistory] = useState([]);
    const [firstBoard, setFirstBoard] = useState(Colors.WHITE);
    const [gameOver, setGameOver] = useState(false);
    const [isGameInitialized, setIsGameInitialized] = useState(false);
    const [graveyardPieces, setGraveyardPieces] = useState([]);
    const [graveyardPiecesHistory, setGraveyardPiecesHistory] = useState([]);
    const [round, setRound] = useState(0);
    const [movedPieces, setMovedPieces] = useState([]);
    const [turn, setTurn] = useState(Colors.WHITE);
    const [lastMovedPiece, setLastMovedPiece] = useState(null);
    const [showSettingsOverlay, setShowSettingsOverlay] = useState(true);
    const [winner, setWinner] = useState(null);
    const [Game, setGame] = useState({});

    const screenWidth = window.innerWidth;

    useEffect(() => {
        console.log(Game.Board ? Game.Board.graveyardPieces :'')
    }, [Game])


    function initGame() {
        const newGame = newGameFactory();
        console.log(newGame)
        setGame(newGame);
        setIsGameInitialized(true);
        setShowSettingsOverlay(false);
    }

    function move(newMove) {
        const newGame = makeMove(Game, newMove);
        setGame(newGame);
    }

    function undoMoveLocally() {
        
        const oldGame = undoMove(Game);
        
        if(oldGame) setGame(oldGame);

    }




    function toggleFirstBoard() {
        if (firstBoard === Colors.WHITE) {
            setFirstBoard(Colors.BLACK)
        } else {
            setFirstBoard(Colors.WHITE)
        }
    }

    return (
        <>
            {showSettingsOverlay
                ?
                <Settings
                    screenWidth = {props.screenWidth}
                    screenHeight = {props.screenHeigh}
                    initGame={initGame}
                    Board = {Game.Board}
                    showSettingsOverlay={showSettingsOverlay}
                    setShowSettingsOverlay={setShowSettingsOverlay}
                    firstBoard={firstBoard}
                    toggleFirstBoard={toggleFirstBoard}
                />
                :
                ''}
            <div className="status-display-container">
                <StatusDisplay
                    Board={isGameInitialized ? Game.Board : {}}
                    undoMove={undoMoveLocally}
                    setShowSettingsOverlay={setShowSettingsOverlay}
                />
            </div>

            {isGameInitialized
                ?
                props.screenWidth > 1000
                    ?
                    <>
                        <div className="splitscreen-games-container">
                            {firstBoard === Colors.WHITE
                                ?
                                <>
                                    <div className="splitscreen-game-container">
                                        <BoardComponent
                                            playerColor={Colors.WHITE}
                                            Board={Game.Board}
                                            move={move}
                                        />
                                    </div>
                                    <div className="splitscreen-game-container">
                                        <BoardComponent
                                            playerColor={Colors.BLACK}
                                            Board={Game.Board}
                                            move={move}
                                        />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="splitscreen-game-container">
                                        <BoardComponent
                                            playerColor={Colors.BLACK}
                                            Board={Game.Board}
                                            move={move}
                                        />
                                    </div>
                                    <div className="splitscreen-game-container">
                                        <BoardComponent
                                            playerColor={Colors.WHITE}
                                            Board={Game.Board}
                                            move={move}
                                        />
                                    </div>
                                </>
                            }

                        </div>
                        <div className="splitscreen-graveyards-container">
                            {firstBoard === Colors.WHITE
                                ?
                                <>
                                    <Graveyard
                                        playerColor={Colors.WHITE}
                                        Board={Game.Board} />
                                    <Graveyard
                                        playerColor={Colors.BLACK}
                                        Board={Game.Board}
                                    />
                                </>
                                :
                                <>
                                    <Graveyard
                                        playerColor={Colors.BLACK}
                                        Board={Game.Board}
                                    />
                                    <Graveyard
                                        playerColor={Colors.WHITE}
                                        Board={Game.Board} />
                                </>
                            }
                        </div>

                    </>
                    :
                    <>
                        <div className="mobile-offline-graveyard-container-first">
                            <Graveyard
                                Board={Game.Board}
                                rotateColor={firstBoard === Colors.WHITE ? Colors.BLACK : Colors.WHITE}
                                playerColor = {firstBoard === Colors.WHITE ? Colors.BLACK : Colors.WHITE}
                            />
                        </div> 
                        <div className="mobile-offline-game-container">
                            
                                <Board
                                    playerColor={firstBoard}
                                    rotateColor={firstBoard === Colors.WHITE ? Colors.BLACK : Colors.WHITE}
                                    firstBoard={firstBoard}
                                    Board={Game.Board}
                                    move={move}
                                />
                           
                        </div>
                        <div className="mobile-offline-graveyard-container-second">
                            <Graveyard
                                Board={Game.Board}
                                rotateColor={firstBoard === Colors.WHITE ? Colors.BLACK : Colors.WHITE}
                                playerColor = {firstBoard}
                            />
                        </div> 
                    </>
                        :
                        ''
                    }
        </>

    )

            }
            
export default SplitscreenGame;