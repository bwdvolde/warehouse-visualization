import * as d3 from "d3";
import {HEIGHT, WIDTH} from "@/drawer/constants";
import Drone from "@/model/Drone";
import {Model} from "@/model/Model";
import {Cell} from "@/model/Cell";
import {getAisle} from "@/model/util";

interface Sizes {
    cellWidth: number;
    cellHeight: number;
}

export default class Drawer {
    private container: any;
    private sizes: Sizes;

    constructor(svgId) {
        this.initContainer(svgId);
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
        this.updateSizes(model);
        this.drawGrid(model.grid, time);
        this.drawDrones(model.drones, time);
    }

    private updateSizes(model: Model) {
        const cellWidth = WIDTH / (3 * model.nAisles);
        const cellHeight = HEIGHT / model.nRows;
        this.sizes = { cellWidth, cellHeight };
    }

    private drawDrones(drones: Drone[], time: number) {
        const elements = this.container
            .selectAll(".drones")
            .data(drones);

        elements
            .enter()
            .append("circle")
            .classed("drones", true);

        elements
            .attr("cx", d => this.calculateXNode((d.positionAt(time).x)))
            .attr("cy", d => this.calculateYNode((d.positionAt(time).y)))
            .attr("r", this.sizes.cellHeight / 4)
            .style("fill", "green");
    }

    private drawGrid(cells: Cell[][], time: number) {
        const flattenedCells = cells.flat();
        const storageCells = flattenedCells.filter(cell => cell.isStorage);

        this.drawStorageCells(storageCells, time);
        this.drawNodes(flattenedCells, time);
    }

    private drawStorageCells(storageCells: Cell[], time: number) {
        const elements = this.container
            .selectAll("rect")
            .data(storageCells);

        elements
            .enter()
            .append("rect");

        elements
            .attr("x", cell => this.calculateXCell(cell.col))
            .attr("y", cell => this.calculateYCell(cell.row))
            .attr("width", this.sizes.cellWidth)
            .attr("height", this.sizes.cellHeight)
            .style("fill", `rgb(${255 - time / 1000}, 0, 0)`)
            .style("stroke-width", "0.5px")
            .style("stroke", "black");
    }

    private drawNodes(cells: Cell[], time: number) {
        const elements = this.container
            .selectAll(".cell-nodes")
            .data(cells);

        elements
            .enter()
            .append("circle")
            .classed("cell-nodes", true);

        elements
            .attr("cx", cell => this.calculateXNode(cell.col))
            .attr("cy", cell => this.calculateYNode(cell.row))
            .attr("r", this.sizes.cellHeight / 4)
            .style("fill", `rgb(${255 - time / 1000}, 0, 0)`);
    }

    calculateXCell(x: number): number {
        const aisle = getAisle(x);
        const aisleOffset = x % 2 >= 1 ? 2 : 0;
        return this.sizes.cellWidth * (3 * aisle + aisleOffset);
    }

    calculateYCell(y: number): number {
        return y * this.sizes.cellHeight;
    }

    calculateXNode(row: number): number {
        const xCell = this.calculateXCell(row);
        if (row % 2 < 1) {
            const distanceBetweenCellAndCellNode = this.sizes.cellWidth + this.sizes.cellWidth / 4;
            const distanceBetweenCellNodeAndNode = this.sizes.cellWidth / 2 * (row % 1);
            return xCell + distanceBetweenCellAndCellNode + distanceBetweenCellNodeAndNode;
        } else {
            const distanceBetweenCellAndCellNode = this.sizes.cellWidth / 4;
            const distanceBetweenCellNodeAndNode = this.sizes.cellWidth * 5 / 2 * (row % 1);
            return xCell - distanceBetweenCellAndCellNode + distanceBetweenCellNodeAndNode;
        }
    }

    calculateYNode(col: number): number {
        const yCell = this.calculateYCell(col);
        return yCell + this.sizes.cellHeight / 2;
    }
}
