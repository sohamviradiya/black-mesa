import { collision } from "./geometry";
import { BoardState, CollectionType } from "./state";
import {  Unit } from "./unit";

export enum CellTypes {
    "PATH",
    "WALL",
    "EMPTY",
    "SLOT",
};

export type CellType = keyof typeof CellTypes;

export abstract class Cell extends Unit {
    public width: number;
    public height: number;
    public triggered: boolean = false;
    collection: CollectionType = "cells";
    constructor(public x: number, public y: number, cellSize: number, public type: CellType, public timer: number) {
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
    addSelf(state: BoardState): void {
        state.collections.cells.push(this);
    }
    removeSelf(state: BoardState): void {
        state.collections.cells = state.collections.cells.filter((cell: Cell) => cell.id !== this.id);
    }
}

export class WallCell extends Cell {
    constructor(x: number, y: number, cellSize: number, public timer: number) {
        super(x, y, cellSize, "WALL", timer);
    }
}

export class PathCell extends Cell {
    constructor(x: number, y: number, cellSize: number, public timer: number) {
        super(x, y, cellSize, "PATH", timer);
    }
}

export class EmptyCell extends Cell {
    constructor(x: number, y: number, cellSize: number, public timer: number) {
        super(x, y, cellSize, "EMPTY", timer);
    }
}

export class SlotCell extends Cell {
    constructor(x: number, y: number, cellSize: number, public isOccupied: boolean = false, public isLocked: boolean = false, public unlockCost: number = 0, public timer: number) {
        super(x, y, cellSize, "SLOT", timer);
    }

    unlock() {
        this.isLocked = false;
    }

    occupy() {
        this.isOccupied = true;
        return this.getState();
    }
}