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

abstract class Unit {
    static nextId = 0;
    public id: number;
    abstract collection: CollectionType;
    constructor(public x: number, public y: number, public width: number, public height: number) {
        this.id = Unit.nextId;
        Unit.nextId++;
    }
    abstract update(state: BoardState): void;
    abstract component(): JSX.Element;

    getState(): ScalarInterface {
        return this;
    }
    abstract addSelf(state: BoardState): void;
    abstract removeSelf(state: BoardState): void;
}

export abstract class ScalarUnit extends Unit {
    constructor(row_index: number, column_index: number, cellSize: number) {
        const x = column_index * cellSize + cellSize / 2;
        const y = row_index * cellSize + cellSize / 2;
        super(x, y, cellSize, cellSize);
    }
};



export abstract class VectorUnit extends Unit implements VectorInterface {
    constructor(x: number, y: number, width: number, height: number, public angle: number) {
        super(x, y, width, height);
    }
    getState(): VectorInterface {
        return this;
    }
}

