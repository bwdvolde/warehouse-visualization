import * as d3 from "d3";
import {HEIGHT} from "@/drawer/constants";
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
            .selectAll(svgId)
            .attr("height", HEIGHT);
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
        this.mapper = new PositionMapper(model, containerWidth);
    }

    private drawDrones(drones: Drone[], time: number) {
        const elements = this.selectOrCreateElements("drone", "circle", drones);

        elements
            .attr("cx", d => this.mapper.calculateXNode((d.positionAt(time).x)))
            .attr("cy", d => this.mapper.calculateYNode((d.positionAt(time).y)))
            .attr("r", this.mapper.nodeR)
            .style("fill", "gray");
    }

    private drawEdges(edges: Edge[]) {
        const elements = this.selectOrCreateElements("edge", "line", edges);

        elements
            .attr("x1", edge => this.mapper.calculateXNode(edge.a.x))
            .attr("y1", edge => this.mapper.calculateYNode(edge.a.y))
            .attr("x2", edge => this.mapper.calculateXNode(edge.b.x))
            .attr("y2", edge => this.mapper.calculateYNode(edge.b.y))
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
            .attr("x", cell => this.mapper.calculateXCell(cell.col))
            .attr("y", cell => this.mapper.calculateYCell(cell.row))
            .attr("width", this.mapper.cellWidth)
            .attr("height", this.mapper.cellHeight)
            .style("fill", cell => this.calculateCellColor(cell, time))
            .style("stroke-width", "0.5px")
            .style("stroke", "black");
    }

    private drawCellNodes(cells: Cell[], time: number) {
        const elements = this.selectOrCreateElements("cell-node", "circle", cells);

        elements
            .attr("cx", cell => this.mapper.calculateXNode(cell.col))
            .attr("cy", cell => this.mapper.calculateYNode(cell.row))
            .attr("r", this.mapper.nodeR)
            .style("fill", cell => this.calculateCellColor(cell, time));
    }

    private calculateCellColor(cell, time: number) {
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
