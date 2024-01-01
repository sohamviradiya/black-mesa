
import InvaderComponent from "../components/invader";
import { Building } from "./buildings/building";
import { Installation } from "./buildings/installation";
import { collision } from "./geometry";
import { BoardState, CollectionType } from "./state";
import { PositionInterface, VectorUnit } from "./unit";


export interface InvaderTemplate {
    speed: number;
    maxHealth: number;
    bounty: number;
    damage: number;
    period: number;
    width: number;
    height: number;
};

export class Invader extends VectorUnit {
    dead: boolean = false;
    collection: CollectionType = "invaders";
    timer: number = 0;
    move: boolean = true;
    health: number;
    constructor(row_index: number, column_index: number, public path: PositionInterface[], public template: InvaderTemplate) {
        super(row_index, column_index, template.width, template.height, 0);
        this.health = template.maxHealth;
    };

    isFireReady(): boolean {
        return this.timer % this.template.period === 0;
    };

    update(state: BoardState): void {
        this.timer++;

        if (this.dead) {
            return this.die(state);
        }
        if (this.isFireReady())
            this.hit(state.collections.buildings);
        if (!this.move) return;

        if (this.path.length > 0) {
            const target = this.path[0];
            const dx = target.x - this.x;
            const dy = target.y - this.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            this.angle = Math.atan2(dy, dx);

            if (distance < this.template.speed) {
                this.path.shift();
                this.x = target.x;
                this.y = target.y;
            } else {
                this.x += dx / distance * this.template.speed;
                this.y += dy / distance * this.template.speed;
            }
        }
        else
            state.gameOver = true;
    };

    private die(state: BoardState) {
        state.energy += this.template.bounty;
        state.score += this.template.bounty;
        this.removeSelf(state);
        return;
    }

    private hit(buildings: Building[]) {
        for (let i = 0; i < buildings.length; i++) {
            const building = buildings[i];
            if (!(building instanceof Installation)) continue;
            if (!building.active) continue;
            if (collision(building, this)) {
                this.move = false;
                building.takeDamage(this.template.damage);
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

    component(): JSX.Element {
        return InvaderComponent({ invader: this });
    }
};