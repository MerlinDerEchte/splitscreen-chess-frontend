import Colors from './constants/Colors';
import { Types } from './constants/Types';

function getPieceImage(type, color) {

    if (type && color) {

        const getImageSrc = (color, type) => {
            switch (color) {
                case Colors.WHITE: {
                    switch (type) {
                        case Types.BISHOP: return process.env.PUBLIC_URL+ "/images/whiteBishop.svg";
                        case Types.KING: return process.env.PUBLIC_URL+ "/images/whiteKing.svg";
                        case Types.KNIGHT: return process.env.PUBLIC_URL+ "/images/whiteKnight.svg";
                        case Types.PAWN: return process.env.PUBLIC_URL+ "/images/whitePawn.svg" ;
                        case Types.QUEEN: return process.env.PUBLIC_URL+ "/images/whiteQueen.svg" ;
                        case Types.ROOK: return process.env.PUBLIC_URL+ "/images/whiteRook.svg" ;
                        default: return '';
                    }break;
                }
                case Colors.BLACK: {
                    switch (type) {
                        case Types.BISHOP: return process.env.PUBLIC_URL+ "/images/blackBishop.svg" ;
                        case Types.KING: return process.env.PUBLIC_URL+ "/images/blackKing.svg" ;
                        case Types.KNIGHT: return process.env.PUBLIC_URL+ "/images/blackKnight.svg" ;
                        case Types.PAWN: return process.env.PUBLIC_URL+ "/images/blackPawn.svg" ;
                        case Types.QUEEN: return process.env.PUBLIC_URL+ "/images/blackQueen.svg" ;
                        case Types.ROOK: return process.env.PUBLIC_URL+ "/images/blackRook.svg" ;
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