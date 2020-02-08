import * as d3 from "d3";
import Drone from "@/model/domain/Drone";
import {Model} from "@/model/domain/Model";
import {Cell} from "@/model/domain/Cell";
import {Edge} from "@/model/domain/Edge";
import * as $ from "jquery";
import {PositionMapper} from "@/drawer/PositionMapper";

export default class Drawer {
    private container: any;
    private svgId: number;
    private mapper: PositionMapper;

    private model: Model;
    private time: number;

    constructor(svgId) {
        this.svgId = svgId;
        this.initContainer(svgId);
    }

    private initContainer(svgId) {
        this.container = d3
            .selectAll(svgId);
    }

    draw(model: Model, time: number) {
        this.model = model;
        this.time = time;

        // We update the mapper each draw tick because the dimensions of the svg can have changed
        this.updatePositionMapper();

        // Ordering is important here because draw order represents stacking order
        this.drawEdges();
        this.drawCells();
        this.drawDrones();
    }

    private updatePositionMapper() {
        const containerWidth = $(this.svgId).width();
        const containerHeight = $(this.svgId).height();
        this.mapper = new PositionMapper(this.model, containerHeight, containerWidth);
    }

    private drawDrones() {
        const drones = this.model.drones;
        const selection = this.model.selection;
        const elements = this.selectOrCreateElements("drone", "circle", drones);

        elements
            .attr("cx", (drone: Drone) => this.mapper.calculateXNode((drone.positionAt(this.time).x)))
            .attr("cy", (drone: Drone) => this.mapper.calculateYNode((drone.positionAt(this.time).y)))
            .attr("r", this.mapper.nodeR)
            .on("click", (drone: Drone) => selection.selectedDrone = drone);
    }

    private drawEdges() {
        const edges = this.model.edges;
        const elements = this.selectOrCreateElements("edge", "line", edges);

        elements
            .attr("x1", (edge: Edge) => this.mapper.calculateXNode(edge.a.x))
            .attr("y1", (edge: Edge) => this.mapper.calculateYNode(edge.a.y))
            .attr("x2", (edge: Edge) => this.mapper.calculateXNode(edge.b.x))
            .attr("y2", (edge: Edge) => this.mapper.calculateYNode(edge.b.y));
    }

    private drawCells() {
        const cells = this.model.cells;
        const flattenedCells = cells.flat();
        const storageCells = flattenedCells.filter(cell => cell.isActive);

        this.drawStorageCells(storageCells);
        this.drawCellNodes(flattenedCells);
    }

    private drawStorageCells(storageCells: Cell[]) {
        const elements = this.selectOrCreateElements("cell", "rect", storageCells);

        elements
            .attr("x", (cell: Cell) => this.mapper.calculateXCell(cell.x))
            .attr("y", (cell: Cell) => this.mapper.calculateYCell(cell.y))
            .attr("width", this.mapper.cellWidth)
            .attr("height", this.mapper.cellHeight)
            .call(elements => this.addCommonCellModifications(elements));
    }

    private drawCellNodes(cells: Cell[]) {
        const elements = this.selectOrCreateElements("cell-node", "circle", cells);

        elements
            .attr("cx", (cell: Cell) => this.mapper.calculateXNode(cell.x))
            .attr("cy", (cell: Cell) => this.mapper.calculateYNode(cell.y))
            .attr("r", this.mapper.nodeR)
            .call(elements => this.addCommonCellModifications(elements));
    }

    private addCommonCellModifications(elements: any): any {
        const selection = this.model.selection;

        return elements
            .style("fill", (cell: Cell) => this.calculateCellColor(cell))
            .filter((cell: Cell) => cell.isActive)
            .classed("cell--selection", (cell: Cell) => cell === selection.selectedCell)
            .classed("cell--hover", (cell: Cell) => cell === selection.hoveredCell)
            .on("mouseover", (cell: Cell) => selection.hoveredCell = cell)
            .on("mouseleave", () => selection.hoveredCell = null)
            .on("click", (cell: Cell) => selection.selectedCell = cell);
    }

    private calculateCellColor(cell) {
        if (!cell.isActive) {
            return "gray";
        }

        let maxValue = 25000;
        const color = d3.scaleLinear()
            .domain([0, maxValue / 2, maxValue])
            // @ts-ignore
            .range(["green", "yellow", "red"]);

        return color(cell.timeSinceLastScanAt(this.time));
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
