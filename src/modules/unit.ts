export enum AlignmentTypes {
    "NORTH",
    "SOUTH",
    "EAST",
    "WEST",
    "SCALAR",
};

export type AlignmentType = keyof typeof AlignmentTypes;

export interface StateInterface {
    x: number;
    y: number;
    width: number;
    height: number;
    alignment: AlignmentType;
};

export class Unit implements StateInterface {
    public width: number;
    public height: number;
    constructor(public x: number, public y: number, cellSize: number, public alignment: AlignmentType) {
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(context: CanvasRenderingContext2D, mouse: StateInterface) {
    };

    update() {

    };

    getState(): StateInterface {
        return this;
    }
};

