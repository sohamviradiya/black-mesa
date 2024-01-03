import CellComponent from "../components/units/cell";
import { Building } from "./building";
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
    constructor(public row_index: number, public column_index: number, cellSize: number, public type: CellType) {
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
        state.collections.cells[this.row_index][this.column_index] = this;
    }
    removeSelf(state: BoardState): void {
        state.collections.cells[this.row_index][this.column_index] = new EmptyCell(this.row_index, this.column_index, this.width);
    }
}

export class WallCell extends Cell {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, "WALL");
    }
}


export class EmptyCell extends Cell {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, "EMPTY");
    }
}

abstract class OccupiableCell extends Cell {
    public occupier: Building | null = null;
    constructor(row_index: number, column_index: number, cellSize: number, public type: CellType) {
        super(row_index, column_index, cellSize, type);
    }

    canOccupy(building: Building): boolean {
        if (this.occupier)
            return false;
        return true;
    }

    occupy(building: Building): boolean {
        if (!this.canOccupy(building))
            return false;
        this.occupier = building;
        return true;
    }

    dismantle(state: BoardState): void {
        if (!this.occupier)
            return;
        this.occupier.dismantle(state);
        this.occupier = null;
    }
}

export class PathCell extends OccupiableCell {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, "PATH");
    }
    canOccupy(building: Building): boolean {
        if (!super.canOccupy(building))
            return false;
        if (building.type in ["BASE", "BARRICADE", "EXPLOSIVE", "GENERATOR"])
            return true;
        return false;
    }
}

export class SlotCell extends OccupiableCell {
    isLocked = true;
    constructor(row_index: number, column_index: number, cellSize: number, public unlockCost: number = 0) {
        super(row_index, column_index, cellSize, "SLOT");
    }
    unlock(state: BoardState): void {
        if (state.energy < this.unlockCost)
            return;
        state.energy -= this.unlockCost;
        this.isLocked = false;
    }
    canOccupy(building: Building): boolean {
        if (this.isLocked)
            return false;
        if (!super.canOccupy(building))
            return false;
        if (building.type in ["DEFENSE"])
            return true;
        return false;
    }
}

export function matrixToCells(matrix: CellType[][], cellSize: number): Cell[][] {
    return matrix.map((row: CellType[], y: number) => {
        return row.map((cellType: CellType, x: number) => {
            if (cellType === "EMPTY")
                return new EmptyCell(x, y, cellSize);
            else if (cellType === "PATH")
                return new PathCell(x, y, cellSize);
            else if (cellType === "SLOT")
                return new SlotCell(x, y, cellSize);
            else if (cellType === "WALL")
                return new WallCell(x, y, cellSize);
            else
                throw new Error("Invalid cell type " + cellType);
        });
    });
}
;
