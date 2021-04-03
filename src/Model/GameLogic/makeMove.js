
import isGameOver from './isGameOver';
import getBoardAfterMove from './getBoardAfterMove';

function makeMove(game, move){
    
    
    const newPiece = move.piece.copy();
    newPiece.move(move.targetPosition);

    const newGame = game.copy();
    const newBoard = getBoardAfterMove(newGame.Board , move) ;
   
    newBoard.isGameOver = isGameOver(newBoard);
    newGame.Board = newBoard;
    newGame.BoardHistory.push(game.Board);
    return newGame;
    
}

export default makeMove;