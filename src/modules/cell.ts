import CellComponent from "../components/units/cell";
import { Building } from "./building";
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
    collection: CollectionType = "cells";
    constructor(public row_index: number, public column_index: number, cellSize: number, public type: CellType) {
        super(row_index, column_index, cellSize);
    }

    update(state: BoardState): void {
        
    }
    component({ setBuilding }: { setBuilding?: (row_index: number, col_index: number) => void}) {
        if(!setBuilding ) throw new Error("setBuilding and demolishBuilding must be defined");
        return CellComponent({ cell: this, setBuilding});
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

export abstract class OccupiableCell extends Cell {
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

    removeOccupier(): void {
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
        if (["BASE", "BARRICADE", "EXPLOSIVE", "GENERATOR"].includes(building.type))
            return true;
        return false;
    }
}

export class SlotCell extends OccupiableCell {
    constructor(row_index: number, column_index: number, cellSize: number, public unlockCost: number = 0, public isLocked: boolean = false) {
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
        if (building.type === "DEFENSE")
            return true;
        return false;
    }
}

export function matrixToCells(matrix: CellType[][], cellSize: number): Cell[][] {
    return matrix.map((row: CellType[], y: number) => {
        return row.map((cellType: CellType, x: number) => {
            if (cellType === "EMPTY")
                return new EmptyCell(y, x, cellSize);
            else if (cellType === "PATH")
                return new PathCell(y, x, cellSize);
            else if (cellType === "SLOT")
                return new SlotCell(y, x, cellSize);
            else if (cellType === "WALL")
                return new WallCell(y, x, cellSize);
            else
                throw new Error("Invalid cell type " + cellType);
        });
    });
}
;
