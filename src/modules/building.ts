import { AlignmentType, StateInterface, Unit } from "./unit";


export enum BuildingTypes {
    "BASE",
    "TURRET",
    "EXPLOSIVE",
    "GENERATOR",
};

export type BuildingType = keyof typeof BuildingTypes;

export class Building extends Unit {
    public width: number;
    public height: number;
    constructor(public x: number, public y: number, cellSize: number, public type: BuildingType, public cost: number = 0, public alignment: AlignmentType) {
        super(x, y, cellSize, alignment);
        this.width = cellSize;
        this.height = cellSize;
    }
}

class Installation extends Building {
    constructor(x: number, y: number, cellSize: number, public health: number, public rate: number, public type: BuildingType, public cost: number, public alignment: AlignmentType) {
        super(x, y, cellSize, type, cost, alignment);
    };
};

export class Base extends Installation {
    constructor(x: number, y: number, cellSize: number, cost: number, health: number, rate: number) {
        super(x, y, cellSize, health, rate, "BASE", cost, "SCALAR");
    };
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};

export class Generator extends Installation {
    constructor(x: number, y: number, cellSize: number, cost: number, health: number, rate: number) {
        super(x, y, cellSize, health, rate, "GENERATOR", cost, "SCALAR");
    };
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};


export class Explosive extends Building {
    constructor(x: number, y: number, cellSize: number, public cost: number, public damage: number) {
        super(x, y, cellSize, "EXPLOSIVE", cost, "SCALAR");
    };
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};
