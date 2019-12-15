import Position from "@/model/Position";

export default class Circle {
    position: Position;
    selected: boolean;

    constructor(position: Position, selected: boolean) {
        this.position = position;
        this.selected = selected;
    }
}
