

import getMoves from './getMoves';
import isValidMove from './isValidMove';

function getValidMoves(board){

    const allMoves = getMoves(board)
    const allValidMoves = allMoves.filter(move => {
        return isValidMove(move,board);
    })    
    return allValidMoves;

}

export default getValidMoves;