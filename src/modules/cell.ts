import { collision } from "./collision";
import { StateInterface, Unit } from "./unit";

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
    constructor(public x: number, public y: number, cellSize: number, public type: CellType) {
        super(x, y, cellSize);
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(context: CanvasRenderingContext2D, mouse: StateInterface) {
        if (collision(mouse, this)) {
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        else {
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
    };
}

export class WallCell extends Cell {
    constructor(x: number, y: number, cellSize: number) {
        super(x, y, cellSize, "WALL");
    }
    draw(context: CanvasRenderingContext2D, mouse: StateInterface) {
        context.fillStyle = 'grey';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

export class PathCell extends Cell {
    constructor(x: number, y: number, cellSize: number) {
        super(x, y, cellSize, "PATH");
    }
    draw(context: CanvasRenderingContext2D, mouse: StateInterface) {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

export class EmptyCell extends Cell {
    constructor(x: number, y: number, cellSize: number) {
        super(x, y, cellSize, "EMPTY");
    }
    draw(context: CanvasRenderingContext2D, mouse: StateInterface) {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
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

    draw(context: CanvasRenderingContext2D, mouse: StateInterface) {
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