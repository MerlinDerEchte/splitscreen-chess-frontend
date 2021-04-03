import getRookMoves from './getRookMoves';
import getBishopMoves from './getBishopMoves';


function getQueenMoves(board, piece) {
    let possibleQueenMoves = [];
    possibleQueenMoves = [...getBishopMoves(board, piece), ...getRookMoves(board, piece)]
    return possibleQueenMoves;
}

export default getQueenMoves;