import CellComponent from "../components/units/cell";
import { collision } from "./geometry";
import { BoardState, CollectionType } from "./state";
import { ScalarUnit } from "./unit";

export enum CellTypes {
    "PATH",
    "WALL",
    "EMPTY",
    "SLOT",
};

export type CellType = keyof typeof CellTypes;

export class Cell extends ScalarUnit {
    public triggered: boolean = false;
    collection: CollectionType = "cells";
    timer: number = 0;
    constructor(row_index: number, column_index: number, cellSize: number, public type: CellType) {
        super(row_index, column_index, cellSize);
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
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, "WALL");
    }
}

export class PathCell extends Cell {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, "PATH");
    }
}

export class EmptyCell extends Cell {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, "EMPTY");
    }
}

export class SlotCell extends Cell {
    constructor(row_index: number, column_index: number, cellSize: number, public isOccupied: boolean = false, public isLocked: boolean = false, public unlockCost: number = 0) {
        super(row_index, column_index, cellSize, "SLOT");
    }

    unlock() {
        this.isLocked = false;
    }

    occupy() {
        this.isOccupied = true;
        return this.getState();
    }

}