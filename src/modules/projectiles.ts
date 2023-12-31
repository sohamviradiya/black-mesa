import { Invader } from "./invader";
import { VectorUnit } from "./unit";

export class Projectile extends VectorUnit {
    public active: boolean = true;
    constructor(x: number, y: number, width: number, height: number, angle: number, public speed: number, public target: Invader, public damage: number) {
        super(x, y, width, height, angle);
    }
    draw(context: CanvasRenderingContext2D, mouse: any): void {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    update(): void {
        if (!this.active) return;

        if (this.target.dead) {
            this.active = false;
            return;
        }

        // TODO: Check for collisions with the target

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.speed) {
            this.x = this.target.x;
            this.y = this.target.y;
            return;
        }

        this.x += dx / distance * this.speed;
        this.y += dy / distance * this.speed;
        this.angle = Math.atan2(dy + 0.001, dx + 0.001);
    };
}