class Piece{
    constructor(type,color,hasMoved, position, id,  lastPosition){
        
        this.color = color;
        this.type = type;
        this.position = position;
        this.id = id;
        this.hasMoved = hasMoved;
        this.lastPosition = lastPosition;
    }

    move(target){
        this.lastPosition = this.position;
        this.position = target;
        this.hasMoved = true;
    }

}

export {Piece};