import Piece from './Piece';
import Board from './Board';
import pieceFactory from './pieceFactory';
import isGameOver from './isGameOver';
function boardFactory(obj){

    const activePieces = obj.activePieces.map(piece => pieceFactory(piece));
    const graveyardPieces = obj.graveyardPieces.map(piece => pieceFactory(piece));
    const turn = obj.turn;
    const round = obj.round;
    const lastMovedPiece = obj.lastMovedPiece ? pieceFactory(obj.lastMovedPiece) : null;
    const isGameOver = obj.isGameOver; 
    return new Board(activePieces,graveyardPieces,turn,round,lastMovedPiece,isGameOver);
}
export default boardFactory;