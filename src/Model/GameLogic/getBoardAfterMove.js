
function getBoardAfterMove(board, move){

    const exchangedPieces = [];
            
    const movedPiece = move.piece.copy();
    movedPiece.move(move.targetPosition);
    exchangedPieces.push(movedPiece);
    
    if(move.otherMovedPiece){
        const otherMovedPiece = move.otherMovedPiece.copy(); 
        otherMovedPiece.move(move.otherTargetPosition);
        exchangedPieces.push(otherMovedPiece)
    }
    const newBoard = board.copyWithExchangedPieces(exchangedPieces);
    
    if(move.removePiece){
        newBoard.removePiece(move.removePiece);
        const newRemovedPiece = move.removePiece.copy();
        newBoard.graveyardPieces.push(newRemovedPiece);
    }
    newBoard.round = newBoard.round + 1;
    newBoard.lastMovedPiece = movedPiece;
    newBoard.switchTurn();
    return newBoard;
}

export default getBoardAfterMove;