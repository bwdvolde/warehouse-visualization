import * as d3 from "d3";
import {HEIGHT, mapX, mapY, WIDTH} from "@/drawer/util";
import Drone from "@/model/Drone";
import {Model} from "@/model/Model";
import {StorageCell} from "@/model/StorageCell";


export default class Drawer {
    private container: any;
    private circles: any;
    private storageCells: any;

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
        this.drawStorageCells(model.storageCells, time);
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
            .attr("r", 3)
            .style("fill", "green");
    }

    private drawStorageCells(storageCells: StorageCell[][], time: number) {
        let flattenedStorageCells = []
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                flattenedStorageCells.push(new StorageCell(row, col));
            }
        }

        this.storageCells = this.container
            .selectAll("rect")
            .data(flattenedStorageCells);

        this.storageCells
            .enter()
            .append("rect");

        const width = 20;
        const height = 10;
        const offset = 5;

        this.storageCells
            .attr("x", cell => offset + (width + 1) * (3 * cell.aisle + (cell.col % 2)))
            .attr("y", cell => offset + (height + 1) * cell.row)
            .attr("width", width)
            .attr("height", height)
            .style("fill", "gray");
    }
}
