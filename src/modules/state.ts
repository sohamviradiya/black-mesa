import { Building } from "./buildings/building";
import { Base } from "./buildings/base";
import { Cell, CellType, EmptyCell, PathCell, SlotCell, WallCell } from "./cell";
import { Invader, InvaderTemplate } from "./invader";
import { Projectile } from "./projectiles";
import { PositionInterface, ScalarInterface } from "./unit";
import { generateGrid } from "./grid";
import variables from "../data/game-variables.json";
import { Difficulty, difficultyMapper } from "./game-setter";

export type CollectionType = "projectiles" | "invaders" | "buildings" | "cells";

export type InvaderSpawn = {
    template: InvaderTemplate,
    timeout: number,
};

export class BoardState {
    public frame: number = 0;
    static lastInvaderSpawn: number = 0;
    public collections: { projectiles: Projectile[], invaders: Invader[], base: Base, buildings: Building[], cells: Cell[] };
    public energy: number = variables["initial-energy"];
    public score: number = 0;
    public gameOver: boolean = false;
    public gameWon: boolean = false;
    public mouse: ScalarInterface;
    public invaderSpawns: InvaderSpawn[];
    public path: PositionInterface[];
    constructor(cellSize: number, difficulty: Difficulty) {
        const { rows, columns, turnFactor } = difficultyMapper(difficulty);
        this.invaderSpawns = [];

        const { matrix, path } = generateGrid(rows, columns, turnFactor);
        this.mouse = { x: 0, y: 0, width: variables["mouse"]["width"], height: variables["mouse"]["height"] };
        this.collections = {
            projectiles: [],
            invaders: [],
            cells: matrixToCells(matrix, cellSize),
            buildings: [],
            base: new Base(path[0].row_index, path[0].column_index, cellSize),
        };
        this.path = pathToPositions(path, cellSize);

    }
    update(): void {
        this.frame++;
        if (this.gameOver || this.gameWon) {
            return;
        }
        if (this.isGameWon()) {
            this.gameWon = true;
            return;
        }
        this.updateInvaders();
        this.collections.projectiles.forEach((projectile: Projectile) => projectile.update(this));
        this.collections.invaders.forEach((invader: Invader) => invader.update(this));
        this.collections.buildings.forEach((building: Building) => building.update(this));
        this.collections.cells.forEach((cell: Cell) => cell.update(this));

    }

    isGameWon(): boolean {
        return (this.collections.invaders.length === 0 && this.invaderSpawns.length === 0);
    }

    updateInvaders() {
        const { timeout, template } = this.invaderSpawns[0];
        if (timeout === this.frame - BoardState.lastInvaderSpawn) {
            this.collections.invaders.push(new Invader(this.path, template));
            this.invaderSpawns.shift();
            BoardState.lastInvaderSpawn = this.frame;
        }
    }

    components(): JSX.Element[] {
        return [
            this.collections.base.component(),
            ...this.collections.buildings.map((building: Building) => building.component()),
            ...this.collections.cells.map((cell: Cell) => cell.component()),
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
    return path.map((position) => ({ x: position.column_index * cellSize, y: position.row_index * cellSize }));
}