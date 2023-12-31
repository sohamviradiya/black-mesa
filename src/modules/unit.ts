

export interface PositionInterface {
    x: number;
    y: number;
};

export interface StateInterface extends PositionInterface {
    width: number;
    height: number;
};

export interface VectorStateInterface extends StateInterface {
    angle: number;
};

export enum AlignmentTypes {
    "NORTH",
    "SOUTH",
    "EAST",
    "WEST",
    "SCALAR",
};

export type AlignmentType = keyof typeof AlignmentTypes;

export class Unit implements StateInterface {
    public width: number;
    public height: number;
    constructor(public x: number, public y: number, cellSize: number) {
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(context: CanvasRenderingContext2D, mouse: StateInterface) { };

    update() { };

    getState(): StateInterface {
        return this;
    }
};

export class VectorUnit implements VectorStateInterface {
    constructor(public x: number, public y: number, public width: number, public height: number, public angle: number) {
        
    }
    draw(context: CanvasRenderingContext2D, mouse: StateInterface) { };
    update() { };
    getState(): VectorStateInterface {
        return this;
    }
}

