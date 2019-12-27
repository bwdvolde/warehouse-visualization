import * as d3 from "d3";
import {HEIGHT, mapX, mapY, WIDTH} from "@/drawer/util";
import Drone from "@/model/Drone";
import {Model} from "@/model/Model";


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

    draw(model: Model, time: number) {
        this.drawDrones(model.drones, time);
    }

    private drawDrones(drones: Drone[], time: number) {
        this.circles = this.container
            .selectAll("circle")
            .data(drones);

        this.circles
            .enter()
            .append("circle");

        this.circles
            .attr("cx", d => mapX(d.positionAt(time).x))
            .attr("cy", d => mapY(d.positionAt(time).y))
            .attr("r", 5)
            .style("fill", "green");
    }
}
