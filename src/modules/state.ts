import { Building } from "./building";
import { Base, BaseTemplate } from "./buildings/base";
import { Cell, CellType, EmptyCell, PathCell, SlotCell, WallCell } from "./cell";
import { Invader, InvaderTemplate } from "./invader";
import { Projectile } from "./projectiles";
import { PositionInterface, ScalarInterface } from "./unit";
import { generateGrid } from "./grid";
import variables from "../data/game-variables.json";
import buildings from "../data/buildings.json";
import difficultyVariables from "../data/difficulty-mappers.json";

export type CollectionType = "projectiles" | "invaders" | "buildings" | "cells";

export type Difficulty = "ROOKIE" | "CASUAL" | "MASTER" | "VETERAN" | "INSANE";

export type InvaderSpawn = {
    template: InvaderTemplate,
    timeout: number,
};

export class BoardState {
    public frame: number = 0;
    lastInvaderSpawn: number = 0;
    public collections: { projectiles: Projectile[], invaders: Invader[], buildings: Building[], cells: Cell[] };
    public energy: number = variables["initial-energy"];
    public score: number = 0;
    public gameOver: boolean = false;
    public gameWon: boolean = false;
    public mouse: ScalarInterface;
    public messages: string[] = [];
    invaderSpawns: InvaderSpawn[];
    public path: PositionInterface[];
    constructor(cellSize: number, difficulty: Difficulty) {
        const { rows, columns, turnFactor } = difficultyVariables[difficulty];
        this.invaderSpawns = [];

        const { matrix, path } = generateGrid(rows, columns, turnFactor);
        this.mouse = { x: 0, y: 0, width: variables["mouse"]["width"], height: variables["mouse"]["height"] };
        const last_point = path[path.length - 1];

        this.collections = {
            projectiles: [],
            invaders: [],
            cells: matrixToCells(matrix, cellSize),
            buildings: [new Base(last_point.row_index, last_point.column_index, buildings["BASE"] as BaseTemplate)],
        };
        this.path = pathToPositions(path, cellSize);

    }
    update(): void {
        this.frame++;
        if (this.gameOver || this.gameWon) {
            return;
        }
        if (this.isGameWon()) {
            this.messages.push("You won with a score of " + this.score);
            this.gameWon = true;
            return;
        }
        this.updateInvaders();
        this.collections.projectiles.forEach((projectile: Projectile) => projectile.update(this));
        this.collections.invaders.forEach((invader: Invader) => invader.update(this));
        this.collections.buildings.forEach((building: Building) => building.update(this));
        this.collections.cells.forEach((cell: Cell) => cell.update(this));
    }

    addMessage(message: string): void {
        if (this.messages.length > 5)
            this.messages.shift();
        this.messages.push(message);
    }

    isGameWon(): boolean {
        return (this.collections.invaders.length === 0 && this.invaderSpawns.length === 0);
    }

    updateInvaders() {
        const { timeout, template } = this.invaderSpawns[0];
        if (timeout === this.frame - this.lastInvaderSpawn) {
            this.collections.invaders.push(new Invader(this.path, template));
            this.invaderSpawns.shift();
            this.lastInvaderSpawn = this.frame;
        }
    }

    addBuilding(slot: SlotCell, building: Building): void {
        if (this.energy < building.cost)
            return;
        if (slot.occupy(building))
            this.energy -= building.cost;
    }

    addPathBuilding(cell: PathCell, building: Building): void {
        if (this.energy < building.cost)
            return;
        if (cell.occupy(building))
            this.energy -= building.cost;
    }

    components(): JSX.Element[] {
        return [
            ...this.collections.cells.map((cell: Cell) => cell.component()),
            ...this.collections.buildings.map((building: Building) => building.component()),
            ...this.collections.invaders.map((invader: Invader) => invader.component()),
            ...this.collections.projectiles.map((projectile: Projectile) => projectile.component()),
        ];
    }
}


function matrixToCells(matrix: CellType[][], cellSize: number): Cell[] {
    const cells: Cell[] = [];
    matrix.forEach((row: CellType[], y: number) => {
        row.forEach((cellType: CellType, x: number) => {
            if (cellType === "EMPTY")
                cells.push(new EmptyCell(x, y, cellSize));
            else if (cellType === "PATH")
                cells.push(new PathCell(x, y, cellSize));
            else if (cellType === "SLOT")
                cells.push(new SlotCell(x, y, cellSize));
            else if (cellType === "WALL")
                cells.push(new WallCell(x, y, cellSize));
        });
    });
    return cells;
};

function pathToPositions(path: { column_index: number; row_index: number; }[], cellSize: number): PositionInterface[] {
    return path.map((position) => ({
        x: position.column_index * cellSize + cellSize / 2,
        y: position.row_index * cellSize + cellSize / 2
    }));
}