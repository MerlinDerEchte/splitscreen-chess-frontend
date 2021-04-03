import {Piece} from './Piece';
class Move{
    constructor(piece, targetPosition, removePiece, otherMovedPiece, otherTargetPosition){
        this.piece = new Piece(piece.type, piece.color,piece.hasMoved,piece.position, piece.id, piece.lastPosition);
        this.targetPosition = targetPosition;
        this.removePiece = removePiece;
        this.otherMovedPiece = otherMovedPiece;
        this.otherTargetPosition = otherTargetPosition;
    }
}

export {Move};