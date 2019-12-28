import * as d3 from "d3";
import {HEIGHT, mapX, mapY, WIDTH} from "@/drawer/util";
import Drone from "@/model/Drone";
import {Model} from "@/model/Model";
import {StorageCell} from "@/model/StorageCell";
import {PositionMapper} from "@/drawer/PositionMapper";


export default class Drawer {
    private container: any;
    private circles: any;
    private storageCells: any;

    private positionMapper: PositionMapper;

    constructor(svgId, model: Model) {
        this.initContainer(svgId);
        this.positionMapper = new PositionMapper(model);
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
        this.drawStorageCells(model, time);
    }

    private drawDrones(drones: Drone[], time: number) {
        this.circles = this.container
            .selectAll("circle")
            .data(drones);

        this.circles
            .enter()
            .append("circle");

        this.circles
            .attr("cx", d => this.positionMapper.mapX(d.positionAt(time).x))
            .attr("cy", d => this.positionMapper.mapY(d.positionAt(time).y))
            .attr("r", 3)
            .style("fill", "green");
    }

    private drawStorageCells(model: Model, time: number) {
        let flattenedStorageCells = model.storageCells.flat();

        this.storageCells = this.container
            .selectAll("rect")
            .data(flattenedStorageCells);

        this.storageCells
            .enter()
            .append("rect");

        const offset = 5;
        const width = (WIDTH - offset) / (4 * (model.nAisles));
        const height = (HEIGHT - offset) / (23);

        this.storageCells
            .attr("x", cell => {
                return offset + (width + 1) * (4 * cell.aisle + (cell.col % 2));
            })
            .attr("y", cell => offset + (height + 1) * cell.row)
            .attr("width", width)
            .attr("height", height)
            .style("fill", `rgb(${255 - time / 50}, 0, 0)`);
    }
}
