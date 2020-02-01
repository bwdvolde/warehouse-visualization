import * as d3 from "d3";
import Drone from "@/model/domain/Drone";
import {Model} from "@/model/domain/Model";
import {Cell} from "@/model/domain/Cell";
import {Edge} from "@/model/domain/Edge";
import * as $ from "jquery";
import {PositionMapper} from "@/drawer/PositionMapper";
import {ModelSelection} from "@/model/domain/ModelSelection";

export default class Drawer {
    private container: any;
    private mapper: PositionMapper;
    private svgId: number;

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

        this.createPositionMapper();

        // Ordering is important here because draw order represents stacking order
        this.drawEdges();
        this.drawCells();
        this.drawDrones();
    }

    private createPositionMapper() {
        const containerWidth = $(this.svgId).width();
        const containerHeight = $(this.svgId).height();
        this.mapper = new PositionMapper(this.model, containerHeight, containerWidth);
    }

    private drawDrones() {
        const drones = this.model.drones;
        const elements = this.selectOrCreateElements("drone", "circle", drones);

        elements
            .attr("cx", (drone: Drone) => this.mapper.calculateXNode((drone.positionAt(this.time).x)))
            .attr("cy", (drone: Drone) => this.mapper.calculateYNode((drone.positionAt(this.time).y)))
            .attr("r", this.mapper.nodeR);
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

        const selection = this.model.selection;

        elements
            .attr("x", (cell: Cell) => this.mapper.calculateXCell(cell.x))
            .attr("y", (cell: Cell) => this.mapper.calculateYCell(cell.y))
            .attr("width", this.mapper.cellWidth)
            .attr("height", this.mapper.cellHeight)
            .classed("cell--selected", (cell: Cell) => cell === selection.cell)
            .style("fill", (cell: Cell) => this.calculateCellColor(cell))
            .on("mouseover", this.makeOnMouseOverFunction())
            .on("mouseleave", this.makeOnMouseLeaveFunction())
            .on("click", (cell: Cell) => selection.cell = cell);
    }

    private makeOnMouseOverFunction() {
        // We have to return a function here instead of doing the stuff ourselves because of this scoping rules
        return function () {
            d3.select(this)
                .classed("cell--hover", true);
        };
    }

    private makeOnMouseLeaveFunction() {
        // We have to return a function here instead of doing the stuff ourselves because of this scoping rules
        return function () {
            d3.select(this)
                .classed("cell--hover", false);
        };
    }

    private drawCellNodes(cells: Cell[]) {
        const elements = this.selectOrCreateElements("cell-node", "circle", cells);

        elements
            .attr("cx", (cell: Cell) => this.mapper.calculateXNode(cell.x))
            .attr("cy", (cell: Cell) => this.mapper.calculateYNode(cell.y))
            .attr("r", this.mapper.nodeR)
            .style("fill", (cell: Cell) => this.calculateCellColor(cell));
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
