import Colors from './constants/Colors';
import { Types } from './constants/Types';

function getPieceImage(type, color) {

    if (type && color) {

        const getImageSrc = (color, type) => {
            switch (color) {
                case Colors.WHITE: {
                    switch (type) {
                        case Types.BISHOP: return "/images/whiteBishop.svg";
                        case Types.KING: return"/images/whiteKing.svg";
                        case Types.KNIGHT: return "/images/whiteKnight.svg";
                        case Types.PAWN: return "/images/whitePawn.svg" ;
                        case Types.QUEEN: return "/images/whiteQueen.svg" ;
                        case Types.ROOK: return "/images/whiteRook.svg" ;
                        default: return '';
                    }break;
                }
                case Colors.BLACK: {
                    switch (type) {
                        case Types.BISHOP: return "/images/blackBishop.svg" ;
                        case Types.KING: return "/images/blackKing.svg" ;
                        case Types.KNIGHT: return "/images/blackKnight.svg" ;
                        case Types.PAWN: return "/images/blackPawn.svg" ;
                        case Types.QUEEN: return "/images/blackQueen.svg" ;
                        case Types.ROOK: return "/images/blackRook.svg" ;
                        default: return '';
                    }break;
                }
                default: return '';
            }
        }

        const imgSrc = getImageSrc(color, type);
        return <img alt="" src = {imgSrc} draggable ="false" />
    }
}
export default getPieceImage;