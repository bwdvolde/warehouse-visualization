import * as d3 from "d3";
import {HEIGHT, mapX, mapY, WIDTH} from "@/drawer/util";
import Circle from "@/model/Circle";


export default class Drawer {
    private container: any;
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

    draw(model: Circle[]) {
        this.circles = this.container
            .selectAll("circle")
            .data(model);

        this.circles
            .enter()
            .append("circle");

        this.circles
            .attr("cx", d => mapX(d.position.x))
            .attr("cy", d => mapY(d.position.y))
            .attr("r", 5)
            .style("fill", "green");
    }
}
