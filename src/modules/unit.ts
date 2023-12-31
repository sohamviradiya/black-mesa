

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

export interface UnitInterface extends ScalarInterface {
    id: number;
    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void;
    update(state: any): void;
    getState(): ScalarInterface;
};

export type AlignmentType = keyof typeof AlignmentTypes;

export abstract class Unit implements UnitInterface {
    static nextId = 0;
    public width: number;
    public height: number;
    public id: number;
    abstract collection: string;
    constructor(public x: number, public y: number, cellSize: number) {
        this.id = Unit.nextId;
        Unit.nextId++;
        this.width = cellSize;
        this.height = cellSize;
    }
    abstract draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void;
    abstract update(state: any): void;

    getState(): ScalarInterface {
        return this;
    }
    removeSelf(state: any): void {
        state.collections[this.collection] = state.collections[this.collection].filter((unit: UnitInterface) => unit.id !== this.id);
    }
    addSelf(state: any): void {
        state.collections[this.collection].push(this);
    }
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

