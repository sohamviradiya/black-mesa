export interface StateInterface {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Unit {
    public width: number;
    public height: number;
    constructor(public x: number, public y: number, cellSize: number) {
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(context: CanvasRenderingContext2D, mouse: StateInterface) {
    };
    update() {
        
    }

    getState(): StateInterface {
        return this;
    }
};