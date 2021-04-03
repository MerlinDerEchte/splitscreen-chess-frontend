
import Types from './Types';
import getMoves from './getMoves';
import getBoardAfterMove from './getBoardAfterMove';
import Move from './Move';
import isKingAttacked from './isKingAttacked';
function isValidMove(move, board) {
   
    if (move.piece.type === Types.KING) {
        //Rochade 
        if (move.otherMovedPiece) {

            if(isKingAttacked(board)){
                return false;
            }

            // check for Each field if move would be possible
            if (move.targetPosition === move.piece.getPosition() - 2) {
                for (let i = 1; i < 3; i++) {
                    const newMove = new Move(move.piece, move.piece.getPosition() - i);
                    if (!isValidMove( newMove, board)) return false;
                }
            } else if (move.targetPosition === move.piece.getPosition() + 2) {
                for (let i = 1; i < 3; i++) {
                    const newMove = new Move(move.piece, move.piece.getPosition() + i);
                    if (!isValidMove(  newMove, board)) return false;
                }
            }
        }
    }


    // get POsition of the King and check if 

    
    const newBoard = getBoardAfterMove(board, move);

    const enemyMoves = getMoves(newBoard);
    const king = newBoard.getKing(board.turn);
    
    for (let enemyMove of enemyMoves) {
        
        if (enemyMove.targetPosition === king.getPosition()) {
            return false
        }
    }

    return true;
}

export default isValidMove;