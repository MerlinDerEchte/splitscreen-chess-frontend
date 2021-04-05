import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Colors from '../../Model/GameLogic/Colors';
import BoardComponent from '../Shared/Game/Board/BoardComponent';
import UndoMoveComponent from '../Shared/Game/UndoMoveComponent/UndoMoveComponent'
import boardFactory from '../../Model/GameLogic/boardFactory';
import './OnlineGame.scss';
import Graveyard from '../Shared/Game/Graveyard/Graveyard';
import StatusDisplay from '../Shared/Game/StatusDisplay/StatusDisplay';
import ReadyToShareComponent from './ReadyToShareComponent/ReadyToShareComponent';
import  ENDPOINT from '../../backendEndpoint.js';
import OtherPlayerLeftComponent from './OtherPlayerLeftComponent/OtherPlayerLeftComponent';
function OnlineGame(props) {
    const gameRoomID = props.match.params.id;
    const [socket, setSocket] = useState(null);
    const [Board, setBoard] = useState({});
    const [areTwoPlayersIngame, setAreTwoPlayersIngame] = useState(false);
    const [playerColor, setPlayerColor] = useState(null);
    const [showUndoOverlay, setShowUndoOverlay] = useState(false);
    const [playerId, setPlayerId] = useState(null);
    const [isInGame, setIsInGame] = useState(false);
    const [otherPlayerLeft, setOtherPlayerLeft] = useState(false);

    useEffect(() => {
        setSocket(null)
        setAreTwoPlayersIngame(false);
        setPlayerColor(null);
        setShowUndoOverlay(false);
        setPlayerId(null);
        setIsInGame(false);
        setOtherPlayerLeft(false);
        setBoard({})
    },[props.match.params.id])


    useEffect(() => {

        if(!isInGame) setSocket(socketIOClient(ENDPOINT),{'pingInterval': 45000});

        if(!playerColor){
            setBoard({})
            setPlayerColor(null)
        }
       
        

    }, [gameRoomID,isInGame]);

    useEffect(() => {
        if (socket) {
            if (!isInGame) {

                socket.emit('joingame', gameRoomID,playerId);
            }
            socket.on('joinedGame', (color, playerId) => {
               
                setPlayerColor(color);
                setPlayerId(playerId);
                setIsInGame(true);

            })

            socket.on('gameChanged', board_unparsed => {

                const board = boardFactory(JSON.parse(JSON.stringify(board_unparsed)));
                setShowUndoOverlay(false);
                setBoard(board)

            })

            socket.on('gameReady', () => {
                setAreTwoPlayersIngame(true)
            })
            socket.on('undoMoveRequest', () => {
                setShowUndoOverlay(true);
            });

            socket.on('disconnect', () => {
                setAreTwoPlayersIngame(false);
                setIsInGame(false);
            })
    
            socket.on("other player left", ()=> {
                console.log("other player left");
                setAreTwoPlayersIngame(false)
                setOtherPlayerLeft(true);
            })

            return () => socket.disconnect();
        }

    }, [socket])

    function move(nextMove) {
        console.log(nextMove);
        socket.emit('makeMove', gameRoomID, JSON.stringify(nextMove));
    }

    function undoMove() {
        if (Board.round > 0) socket.emit('undoMoveRequest', gameRoomID);

    }

    function acceptUndoMove() {
        socket.emit('acceptUndoMove', gameRoomID)
    }

    return (

        <>{showUndoOverlay
            ?
            <UndoMoveComponent
                acceptUndoMove={acceptUndoMove}
                setShowUndoOverlay={setShowUndoOverlay}
            /> :
            ''}
            <div className="status-display-container">
                <StatusDisplay
                    Board={Board}
                    undoMove={undoMove}

                />
            </div>

            {areTwoPlayersIngame
                ?
                <>
                    <div className="games-online-container">

                        {playerColor && Board.activePieces ?
                            playerColor === Colors.WHITE
                                ?
                                <BoardComponent
                                    screenWidth={props.screenWidth}
                                    screenHeight={props.screenHeight}
                                    playerColor={playerColor}
                                    Board={Board}
                                    move={move}

                                />
                                :
                                <BoardComponent
                                    screenWidth={props.screenWidth}
                                    screenHeight={props.screenHeight}
                                    playerColor={playerColor}
                                    Board={Board}
                                    move={move}

                                />
                            :
                            ''
                        }

                    </div>
                    {playerColor && Board.graveyardPieces
                        ?
                        <div className="graveyards-container">
                            <Graveyard
                                screenWidth={props.screenWidth}
                                screenHeight={props.screenHeight}
                                playerColor={playerColor}
                                Board={Board} />
                        </div>
                        :
                        ''
                    }
                </>
                :

                otherPlayerLeft 
                ?
                <OtherPlayerLeftComponent />

                :
                <ReadyToShareComponent
                    screenWidth={props.screenWidth}
                    screenHeight={props.screenHeight}
                />
            }

        </>
    )
}
export default OnlineGame;