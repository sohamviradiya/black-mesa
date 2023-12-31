import { collision } from "./geometry";
import { BoardState } from "./state";
import { ScalarInterface, Unit } from "./unit";

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
    collection: string = "cells";
    constructor(public x: number, public y: number, cellSize: number, public type: CellType, public timer: number) {
        super(x, y, cellSize);
        this.width = cellSize;
        this.height = cellSize;
    }
    abstract draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void;

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
}

export class WallCell extends Cell {
    constructor(x: number, y: number, cellSize: number, public timer: number) {
        super(x, y, cellSize, "WALL", timer);
    }
    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface) {
        context.fillStyle = 'grey';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

export class PathCell extends Cell {
    constructor(x: number, y: number, cellSize: number, public timer: number) {
        super(x, y, cellSize, "PATH", timer);
    }
    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface) {
        context.fillStyle = 'whitesmoke';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

export class EmptyCell extends Cell {
    constructor(x: number, y: number, cellSize: number, public timer: number) {
        super(x, y, cellSize, "EMPTY", timer);
    }
    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface) {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
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

    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface) {
        if (collision(mouse, this))
            context.strokeStyle = 'lightgreen';
        else if (this.isOccupied)
            context.fillStyle = 'red';
        else if (this.isLocked)
            context.fillStyle = 'yellow';
        else
            context.fillStyle = 'green';

        context.fillRect(this.x, this.y, this.width, this.height);
    };
}