
import Piece from './Piece';

function pieceFactory(obj){
    return new Piece(obj.type, obj.color, obj.hasMoved, obj.position, obj.id, obj.lastPosition);
}

export default pieceFactory;