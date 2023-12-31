import { PositionInterface, VectorUnit } from "./unit";


export class Invader extends VectorUnit {
    constructor(public x: number, public y: number, cellSize: number, public path: PositionInterface[], public speed: number, public health: number) {
        super(x, y, cellSize, 0);
    };
    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};