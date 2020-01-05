import Position from "@/model/Position";

export class Edge {
    a: Position;
    b: Position;


    constructor(x: Position, y: Position) {
        this.a = x;
        this.b = y;
    }
}
