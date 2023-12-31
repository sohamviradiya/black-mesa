
import { PositionInterface, VectorUnit } from "./unit";


export class Invader extends VectorUnit {
    dead: boolean = false;
    constructor(x: number, y: number, width: number, height: number, public path: PositionInterface[], public speed: number, public health: number, public bounty: number, public damage: number) {
        super(x, y, width, height, 0);
    };
    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(): void {
        if (this.dead) return;

        // TODO: Check for collisions with the buildings

        if (this.path.length > 0) {
            const target = this.path[0];
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            this.angle = Math.atan2(dy + 0.001, dx + 0.001);
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
    takeDamage(damage: number): void {
        if (this.dead) return;
        this.health -= damage;
        if (this.health <= 0) {
            this.dead = true;
        }
    };
};