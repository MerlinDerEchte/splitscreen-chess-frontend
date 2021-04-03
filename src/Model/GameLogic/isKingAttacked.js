import getMoves from "./getMoves";



function isKingAttacked(board){

    const newBoard = board.copy();
    
    newBoard.switchTurn();
    const allMoves = getMoves(newBoard);
    const king = newBoard.getKing(board.turn);
    for( let move of allMoves){
        if(move.targetPosition === king.getPosition()) return true;
    }
    return false;

}

export default isKingAttacked;