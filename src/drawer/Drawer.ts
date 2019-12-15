import * as d3 from "d3";

const WIDTH = 800;
const HEIGHT = 400;

function mapX(x: number) {
    return x * (WIDTH / 100)
}

function mapY(y: number) {
    return y * (HEIGHT / 100)
}

export default class Drawer {
    container: any;
    private circles: any;

    constructor(svgId) {
        this.initContainer(svgId);
    }

    private initContainer(svgId) {
        this.container = d3
            .selectAll(svgId)
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .style("border", "solid");
    }

    draw(model: any) {
        this.circles = this.container
            .selectAll("circle")
            .data(model);

        this.circles
            .enter()
            .append("circle");

        this.circles
            .attr("cx", d => mapX(d.x))
            .attr("cy", d => mapY(d.y))
            .attr("r", 10)
            .style("fill", "green");
    }
}
