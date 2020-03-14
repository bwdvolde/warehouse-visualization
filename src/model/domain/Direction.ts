export class Direction {

    static readonly UP = new Direction(0, -1);
    static readonly DOWN = new Direction(0, 1);
    static readonly RIGHT = new Direction(1, 0);
    static readonly LEFT = new Direction(-1, 0);
    static readonly NONE = new Direction(0, 0);

    dx: number;
    dy: number;

    private constructor(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }
}
