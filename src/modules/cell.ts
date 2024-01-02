import CellComponent from "../components/units/cell";
import { Barricade } from "./buildings/barricade";
import { Base } from "./buildings/base";
import { Building } from "./buildings/building";
import { Explosive } from "./buildings/explosive";
import { Generator } from "./buildings/generator";
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


export class EmptyCell extends Cell {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, "EMPTY");
    }
}

abstract class OccupiableCell extends Cell {
    public occupier: Building | null = null;
    constructor(row_index: number, column_index: number, cellSize: number, public unlockCost: number = 0, public isLocked: boolean = true, public type: CellType) {
        super(row_index, column_index, cellSize, type);
    }

    unlock() {
        this.isLocked = false;
    }

    canOccupy(building: Building): boolean {
        if (this.occupier || this.isLocked || this.unlockCost > building.cost)
            return false;
        return true;
    }

    occupy(building: Building): boolean {
        if (!this.canOccupy(building))
            return false;
        this.occupier = building;
        return true;
    }
}

export class PathCell extends OccupiableCell {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, 0, false, "PATH");
    }
    canOccupy(building: Building): boolean {
        if (!super.canOccupy(building))
            return false;
        if (building instanceof Explosive || building instanceof Barricade || building instanceof Base)
            return true;
        return false;
    }
}

export class SlotCell extends OccupiableCell {
    constructor(row_index: number, column_index: number, cellSize: number, public unlockCost: number = 0, public isLocked: boolean = true) {
        super(row_index, column_index, cellSize, unlockCost, isLocked, "SLOT");
    }
    canOccupy(building: Building): boolean {
        if (!super.canOccupy(building))
            return false;
        if (building instanceof Generator || building instanceof Barricade)
            return true;
        return false;
    }
}