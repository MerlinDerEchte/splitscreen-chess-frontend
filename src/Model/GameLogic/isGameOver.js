import getValidMoves from './getValidMoves';


function isGameOver(board){
    const allMoves = getValidMoves(board);
    return allMoves.length === 0;
}

export default isGameOver;