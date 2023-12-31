import { BoardState, CollectionType } from "./state";


export interface PositionInterface {
    x: number;
    y: number;
};

export interface ScalarInterface extends PositionInterface {
    width: number;
    height: number;
};

export interface VectorInterface extends ScalarInterface {
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

export abstract class Unit {
    static nextId = 0;
    public width: number;
    public height: number;
    public id: number;
    abstract collection: CollectionType;
    constructor(public x: number, public y: number, cellSize: number) {
        this.id = Unit.nextId;
        Unit.nextId++;
        this.width = cellSize;
        this.height = cellSize;
    }
    abstract draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void;
    abstract update(state: BoardState): void;

    getState(): ScalarInterface {
        return this;
    }
    abstract addSelf(state: BoardState): void;
    abstract removeSelf(state: BoardState): void;
};

export abstract class VectorUnit extends Unit implements VectorInterface {
    constructor(public x: number, public y: number, public width: number, public height: number, public angle: number) {
        super(x, y, width);
        this.width = width;
        this.height = height;
    }
    getState(): VectorInterface {
        return this;
    }
}

