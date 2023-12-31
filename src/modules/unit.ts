

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

export interface UnitInterface extends StateInterface {
    id: number;
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void;
    update(state: any): void;
    getState(): StateInterface;
};

export type AlignmentType = keyof typeof AlignmentTypes;

export abstract class Unit implements UnitInterface {
    static nextId = 0;
    public width: number;
    public height: number;
    public id: number;
    constructor(public x: number, public y: number, cellSize: number) {
        this.id = Unit.nextId;
        Unit.nextId++;
        this.width = cellSize;
        this.height = cellSize;
    }
    abstract draw(context: CanvasRenderingContext2D, mouse: StateInterface): void;
    abstract update(state: any): void;

    getState(): StateInterface {
        return this;
    }
};

export abstract class VectorUnit extends Unit implements VectorStateInterface {
    constructor(public x: number, public y: number, public width: number, public height: number, public angle: number) {
        super(x, y, width);
        this.width = width;
        this.height = height;
    }
    getState(): VectorStateInterface {
        return this;
    }
}

