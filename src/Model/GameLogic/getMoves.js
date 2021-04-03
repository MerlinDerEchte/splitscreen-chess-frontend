

import PieceFilterCondition from './PieceFilterCondition';
import PieceFilterConditionTypes from './PieceFilterConditionTypes';
import PieceFilter from './PieceFilter';
import getPieceMoves from './getPieceMoves';
//function getMoves(board, checkForKingSafety) 
function getMoves(board) {
   
    let allMoves = [];

    const p_FilterCondition_Color = new PieceFilterCondition("color", board.turn, PieceFilterConditionTypes.EQUAL);

    const p_Filter = new PieceFilter([p_FilterCondition_Color]);

    let pieces = p_Filter.filter(board.activePieces);

    pieces.forEach((piece) => {
        
        allMoves.push(...getPieceMoves(piece , board));
    });



    return allMoves;


    


}

export default getMoves;