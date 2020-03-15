import {Direction} from "@/model/domain/Direction";

export class Operation {

    static readonly UP = new Operation("UP", Direction.UP);
    static readonly DOWN = new Operation("DOWN", Direction.DOWN);
    static readonly LEFT = new Operation("LEFT", Direction.LEFT);
    static readonly RIGHT = new Operation("RIGHT", Direction.RIGHT);
    static readonly SCAN = new Operation("SCAN", Direction.NONE);

    static readonly moveOperations = [Operation.UP, Operation.DOWN, Operation.LEFT, Operation.RIGHT];

    name: string;
    direction: Direction;

    private constructor(name: string, direction: Direction) {
        this.name = name;
        this.direction = direction;
    }
}
