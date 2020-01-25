import * as d3 from "d3";
import Drone from "@/model/domain/Drone";
import {Model} from "@/model/domain/Model";
import {Cell} from "@/model/domain/Cell";
import {Edge} from "@/model/domain/Edge";
import * as $ from "jquery";
import {PositionMapper} from "@/drawer/PositionMapper";

export default class Drawer {
    private container: any;
    private mapper: PositionMapper;
    private svgId: number;

    constructor(svgId) {
        this.svgId = svgId;
        this.initContainer(svgId);
    }

    private initContainer(svgId) {
        this.container = d3
            .selectAll(svgId);
    }

    draw(model: Model, time: number) {
        this.createPositionMapper(model);

        // Ordering is important here because draw order represents stacking order
        this.drawEdges(model.edges);
        this.drawCells(model.cells, time);
        this.drawDrones(model.drones, time);
    }

    private createPositionMapper(model: Model) {
        const containerWidth = $(this.svgId).width();
        const containerHeight = $(this.svgId).height();
        this.mapper = new PositionMapper(model, containerHeight, containerWidth);
    }

    private drawDrones(drones: Drone[], time: number) {
        const elements = this.selectOrCreateElements("drone", "circle", drones);

        elements
            .attr("cx", d => this.mapper.calculateXNode((d.positionAt(time).x)))
            .attr("cy", d => this.mapper.calculateYNode((d.positionAt(time).y)))
            .attr("r", this.mapper.nodeR);
    }

    private drawEdges(edges: Edge[]) {
        const elements = this.selectOrCreateElements("edge", "line", edges);

        elements
            .attr("x1", edge => this.mapper.calculateXNode(edge.a.x))
            .attr("y1", edge => this.mapper.calculateYNode(edge.a.y))
            .attr("x2", edge => this.mapper.calculateXNode(edge.b.x))
            .attr("y2", edge => this.mapper.calculateYNode(edge.b.y));
    }

    private drawCells(cells: Cell[][], time: number) {
        const flattenedCells = cells.flat();
        const storageCells = flattenedCells.filter(cell => cell.isActive);

        this.drawStorageCells(storageCells, time);
        this.drawCellNodes(flattenedCells, time);
    }

    private drawStorageCells(storageCells: Cell[], time: number) {
        const elements = this.selectOrCreateElements("cell", "rect", storageCells);

        elements
            .attr("x", cell => this.mapper.calculateXCell(cell.x))
            .attr("y", cell => this.mapper.calculateYCell(cell.y))
            .attr("width", this.mapper.cellWidth)
            .attr("height", this.mapper.cellHeight)
            .style("fill", cell => this.calculateCellColor(cell, time));
    }

    private drawCellNodes(cells: Cell[], time: number) {
        const elements = this.selectOrCreateElements("cell-node", "circle", cells);

        elements
            .attr("cx", cell => this.mapper.calculateXNode(cell.x))
            .attr("cy", cell => this.mapper.calculateYNode(cell.y))
            .attr("r", this.mapper.nodeR)
            .style("fill", cell => this.calculateCellColor(cell, time));
    }

    private calculateCellColor(cell, time: number) {
        if (!cell.isActive) {
            return "gray";
        }

        let maxValue = 25000;
        const color = d3.scaleLinear()
            .domain([0, maxValue / 2, maxValue])
            // @ts-ignore
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
}
