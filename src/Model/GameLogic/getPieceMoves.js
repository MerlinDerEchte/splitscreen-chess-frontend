import getPawnMoves from './getPawnMoves';
import getKnightMoves from './getKnightMoves';
import getKingMoves from './getKingMoves';
import getQueenMoves from './getQueenMoves';
import getRookMoves from './getRookMoves';
import getBishopMoves from './getBishopMoves';
import Types from './Types';

function getPieceMoves(piece, board){

    if (piece.type === Types.PAWN) {

        return  getPawnMoves(board, piece);

    } else if (piece.type === Types.BISHOP) {

        return  getBishopMoves(board, piece);

    } else if (piece.type === Types.KNIGHT) {

        return  getKnightMoves(board, piece);

    } else if (piece.type === Types.ROOK) {

        return getRookMoves(board, piece);

    } else if (piece.type === Types.QUEEN) {

        return getQueenMoves(board, piece);

    } else if (piece.type === Types.KING) {
        //getKingMoves(board, piece,checkForKingSafety)
        return getKingMoves(board, piece);

    } else {
        return [];
    }
}

export default getPieceMoves;