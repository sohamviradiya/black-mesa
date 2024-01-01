import CellComponent from "../components/units/cell";
import { collision } from "./geometry";
import { BoardState, CollectionType } from "./state";
import { Unit } from "./unit";

export enum CellTypes {
    "PATH",
    "WALL",
    "EMPTY",
    "SLOT",
};

export type CellType = keyof typeof CellTypes;

export class Cell extends Unit {
    public width: number;
    public height: number;
    public triggered: boolean = false;
    collection: CollectionType = "cells";
    timer: number = 0;
    constructor(public x: number, public y: number, cellSize: number, public type: CellType) {
        super(x, y, cellSize);
        this.width = cellSize;
        this.height = cellSize;
    }

    update(state: BoardState): void {
        if (collision(state.mouse, this)) {
            this.triggered = true;
            this.timer = 100;
        }
        else {
            this.timer--;
            if (this.timer <= 0) {
                this.timer = 0;
                this.triggered = false;
            }
        }
    }
    component() {
        return CellComponent({ cell: this });
    }

    addSelf(state: BoardState): void {
        state.collections.cells.push(this);
    }
    removeSelf(state: BoardState): void {
        state.collections.cells = state.collections.cells.filter((cell: Cell) => cell.id !== this.id);
    }
}

export class WallCell extends Cell {
    constructor(x: number, y: number, cellSize: number) {
        super(x, y, cellSize, "WALL");
    }
}

export class PathCell extends Cell {
    constructor(x: number, y: number, cellSize: number) {
        super(x, y, cellSize, "PATH");
    }
}

export class EmptyCell extends Cell {
    constructor(x: number, y: number, cellSize: number) {
        super(x, y, cellSize, "EMPTY");
    }
}

export class SlotCell extends Cell {
    constructor(x: number, y: number, cellSize: number, public isOccupied: boolean = false, public isLocked: boolean = false, public unlockCost: number = 0) {
        super(x, y, cellSize, "SLOT");
    }

    unlock() {
        this.isLocked = false;
    }

    occupy() {
        this.isOccupied = true;
        return this.getState();
    }

}