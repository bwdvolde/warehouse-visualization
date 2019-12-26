export const WIDTH = 800;
export const HEIGHT = 400;

export function mapX(x: number) {
    return x * (WIDTH / 100);
}

export function mapY(y: number) {
    return y * (HEIGHT / 100);
}
