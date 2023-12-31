import { PositionInterface, VectorUnit } from "./unit";


export class Invader extends VectorUnit {
    constructor(public x: number, public y: number, cellSize: number, public path: PositionInterface[], public speed: number, public health: number) {
        super(x, y, cellSize, 0);
    };
    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(): void {
        if (this.path.length > 0) {
            const target = this.path[0];
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.speed) {
                this.path.shift();
                this.x = target.x;
                this.y = target.y;
            } else {
                this.x += dx / distance * this.speed;
                this.y += dy / distance * this.speed;
            }
        }
    };
};