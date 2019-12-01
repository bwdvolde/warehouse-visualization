import * as d3 from "d3";

export default class Drawer {
    container: any;
    private circles: any;

    constructor(svgId) {
        this.initContainer(svgId);
    }

    private initContainer(svgId) {
        this.container = d3
            .selectAll(svgId)
            .attr("width", 400)
            .attr("height", 400);
    }

    draw(model: any) {
        this.circles = this.container
            .selectAll("circle")
            .data(model);

        this.circles
            .enter()
            .append("circle");

        this.circles
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", 10)
            .style("fill", "green");
    }
}
