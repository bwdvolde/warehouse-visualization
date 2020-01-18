export interface Direction {
    dx: number;
    dy: number;
}

// We only want a constant amount of objects of this class.
// In order to achieve this, we don't export the constructor of the class.
class _Direction implements Direction {
    dx: number;
    dy: number;

    constructor(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }
}

export const DIRECTION_NORTH = new _Direction(0, -1);
export const DIRECTION_SOUTH = new _Direction(0, 1);
export const DIRECTION_EAST = new _Direction(1, 0);
export const DIRECTION_WEST = new _Direction(-1, 0);
export const DIRECTION_NONE = new _Direction(0, 0);
