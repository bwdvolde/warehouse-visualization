import * as d3 from "d3";
import {HEIGHT, WIDTH} from "@/drawer/constants";
import Drone from "@/model/Drone";
import {Model} from "@/model/Model";
import {Cell} from "@/model/Cell";
import {getAisle} from "@/model/util";
import {Edge} from "@/model/Edge";

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
            .style("padding", "5px");
    }

    draw(model: Model, time: number) {
        this.updateSizes(model);
        // Ordering is important here because draw order represents stacking order
        this.drawEdges(model.edges, time);
        this.drawCells(model.cells, time);
        this.drawDrones(model.drones, time);
    }

    private updateSizes(model: Model) {
        const cellWidth = WIDTH / (3 * model.nAisles);
        const cellHeight = HEIGHT / model.nRows;
        this.sizes = { cellWidth, cellHeight };
    }

    private drawDrones(drones: Drone[], time: number) {
        const elements = this.selectOrCreateElements("drone", "circle", drones);

        elements
            .attr("cx", d => this.calculateXNode((d.positionAt(time).x)))
            .attr("cy", d => this.calculateYNode((d.positionAt(time).y)))
            .attr("r", this.sizes.cellHeight / 4)
            .style("fill", "gray");
    }

    private drawEdges(edges: Edge[], time: number) {
        const elements = this.selectOrCreateElements("edge", "line", edges);

        elements
            .attr("x1", edge => this.calculateXNode(edge.a.x))
            .attr("y1", edge => this.calculateYNode(edge.a.y))
            .attr("x2", edge => this.calculateXNode(edge.b.x))
            .attr("y2", edge => this.calculateYNode(edge.b.y))
            .attr("stroke", "#999")
            .attr("stroke-opacity", 1.0);
    }

    private drawCells(cells: Cell[][], time: number) {
        const flattenedCells = cells.flat();
        const storageCells = flattenedCells.filter(cell => cell.isStorage);

        this.drawStorageCells(storageCells, time);
        this.drawCellNodes(flattenedCells, time);
    }

    private drawStorageCells(storageCells: Cell[], time: number) {
        const elements = this.selectOrCreateElements("cell", "rect", storageCells);

        elements
            .attr("x", cell => this.calculateXCell(cell.col))
            .attr("y", cell => this.calculateYCell(cell.row))
            .attr("width", this.sizes.cellWidth)
            .attr("height", this.sizes.cellHeight)
            .style("fill", cell => this.determineCellColor(cell, time))
            .style("stroke-width", "0.5px")
            .style("stroke", "black");
    }

    private drawCellNodes(cells: Cell[], time: number) {
        const elements = this.selectOrCreateElements("cell-node", "circle", cells);

        elements
            .attr("cx", cell => this.calculateXNode(cell.col))
            .attr("cy", cell => this.calculateYNode(cell.row))
            .attr("r", this.sizes.cellHeight / 4)
            .style("fill", cell => this.determineCellColor(cell, time));
    }

    private determineCellColor(cell, time: number) {
        let maxValue = 25000;

        const color = d3.scaleLinear()
            .domain([0, maxValue/ 2, maxValue])
            .range(["green", "yellow", "red"]);

        return color(cell.timeSinceLastScanAt(time));
    }

    private selectOrCreateElements(classToSelect: string, elementToAppend: string, data: any[]) {
        const elements = this.container
            .selectAll(`.${classToSelect}`)
            .data(data);

        elements
            .enter()
            .append(elementToAppend)
            .classed(classToSelect, true);
        return elements;
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
