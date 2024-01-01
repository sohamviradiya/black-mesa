
import { Building, Installation } from "./building";
import { collision } from "./geometry";
import { BoardState, CollectionType } from "./state";
import { PositionInterface, VectorUnit } from "./unit";


export class Invader extends VectorUnit {
    dead: boolean = false;
    collection: CollectionType = "invaders";
    timer: number = 0;
    move: boolean = true;
    constructor(x: number, y: number, width: number, height: number, public path: PositionInterface[], public speed: number, public health: number, public bounty: number, public damage: number, public period: number) {
        super(x, y, width, height, 0);
    };
    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    };

    isFireReady(): boolean {
        return this.timer % this.period === 0;
    };

    update(state: BoardState): void {
        this.timer++;

        if (this.dead) {
            state.energy += this.bounty;
            this.removeSelf(state);
            return;
        }
        if (this.isFireReady())
            this.hit(state.collections.buildings);

        if (this.move && this.path.length > 0) {
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
        else
            state.gameOver = true;
    };

    private hit(buildings: Building[]) {
        for (let i = 0; i < buildings.length; i++) {
            const building = buildings[i];
            if (!(building instanceof Installation)) continue;
            if (!building.active) continue;
            if (collision(building, this)) {
                this.move = false;
                building.takeDamage(this.damage);
                return;
            }
        }
        this.move = true;
    }

    takeDamage(damage: number): void {
        if (this.dead) return;
        this.health -= damage;
        if (this.health <= 0) {
            this.dead = true;
        }
    };

    addSelf(state: BoardState): void {
        state.collections.invaders.push(this);
    }

    removeSelf(state: BoardState): void {
        state.collections.invaders = state.collections.invaders.filter((invader: Invader) => invader.id !== this.id);
    }
};