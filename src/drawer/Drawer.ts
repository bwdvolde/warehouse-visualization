import * as d3 from "d3";
import {HEIGHT, WIDTH} from "@/drawer/util";
import Drone from "@/model/Drone";
import {Model} from "@/model/Model";
import {PositionMapper} from "@/drawer/PositionMapper";
import {Cell} from "@/model/Cell";
import {getAisle} from "@/model/util";


export default class Drawer {
    private container: any;
    private positionMapper: PositionMapper;

    private cellWidth: number;
    private cellHeight: number;

    constructor(svgId, model: Model) {
        this.initContainer(svgId);
        this.positionMapper = new PositionMapper(model);
    }

    private initContainer(svgId) {
        this.container = d3
            .selectAll(svgId)
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .style("border", "solid")
            .style("padding", "5px");
    }

    draw(model: Model, time: number) {

        this.cellWidth = WIDTH / (3 * model.nAisles);
        this.cellHeight = HEIGHT / model.nRows;

        this.drawDrones(model.drones, time);
        this.drawGrid(model.grid, time);
    }

    private drawDrones(drones: Drone[], time: number) {
        const elements = this.container
            .selectAll("circle")
            .data(drones);

        elements
            .enter()
            .append("circle");

        elements
            .attr("cx", d => this.positionMapper.mapX(d.positionAt(time).x))
            .attr("cy", d => this.positionMapper.mapY(d.positionAt(time).y))
            .attr("r", this.cellHeight / 4)
            .style("fill", "green");
    }

    private drawGrid(cells: Cell[][], time: number) {
        let storageCells = cells
            .flat()
            .filter(cell => cell.isStorage);

        const elements = this.container
            .selectAll("rect")
            .data(storageCells);

        elements
            .enter()
            .append("rect");

        elements
            .attr("x", cell => this.calculateXCell(cell.col, this.cellWidth))
            .attr("y", cell => this.calculateYCell(cell.row, this.cellHeight))
            .attr("width", this.cellWidth)
            .attr("height", this.cellHeight)
            .style("fill", `rgb(${255 - time / 1000}, 0, 0)`)
            .style("stroke-width", "0.5px")
            .style("stroke", "black");
    }

    calculateXCell(x: number, cellWidth: number): number {
        const aisle = getAisle(x);
        const aisleOffset = x % 2 ? 2 : 0;
        return cellWidth * (3 * aisle + aisleOffset);
    }

    calculateYCell(y: number, cellHeight: number): number {
        return y * cellHeight;
    }
}
