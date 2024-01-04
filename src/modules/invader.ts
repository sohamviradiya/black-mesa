import InvaderComponent from "../components/units/invader";
import { Building } from "./building";
import { Installation } from "./buildings/installation";
import { collision } from "./geometry";
import { CollectionType, BoardState, Difficulty  } from "./state";
import { PositionInterface, VectorUnit } from "./unit";
import difficultyVariables from "../data/difficulty-mappers.json";


export type InvaderType = "ALPHA" | "GAMMA" | "LAMBDA" | "SIGMA" | "OMEGA";

export interface InvaderTemplate {
    type: InvaderType;
    speedFactor: number;
    maxHealth: number;
    bounty: number;
    damage: number;
    period: number;
    widthFactor: number;
    heightFactor: number;
};

export class Invader extends VectorUnit {
    dead: boolean = false;
    collection: CollectionType = "invaders";
    timer: number = 0;
    moving: boolean = true;
    health: number;
    public speed: number = 0;
    constructor(public path: PositionInterface[], public template: InvaderTemplate, cellSize: number) {
        super(path[0].x, path[0].y, template.widthFactor * cellSize, template.heightFactor * cellSize, 0);
        this.speed = template.speedFactor * cellSize;
        this.health = template.maxHealth;
    };

    isFireReady(): boolean {
        return this.timer % this.template.period === 0;
    };

    update(state: BoardState): void {
        this.timer++;

        if (this.dead) {
            this.die(state);
            return;
        }
        if (this.isFireReady())
            this.hit(state.collections.buildings);

        if (!this.moving)
            return;

        if (this.path.length > 0) {
            const target = this.path[0];
            const dx = target.x - this.x;
            const dy = target.y - this.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            this.angle = Math.atan2(dy, dx);

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

    private die(state: BoardState) {
        state.energy += this.template.bounty;
        state.score += this.template.bounty;
        state.addMessage("You killed an invader of type " + this.template.type + " for " + this.template.bounty + " energy");
        this.removeSelf(state);
        return;
    }

    private hit(buildings: Building[]) {
        for (let i = 0; i < buildings.length; i++) {
            const building = buildings[i];
            if (!(building instanceof Installation)) continue;
            if (!building.active) continue;
            if (collision(building, this)) {
                this.moving = false;
                building.takeDamage(this.template.damage);
                return;
            }
        }
        this.moving = true;
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
        return super.component({ children: InvaderComponent({ invader: this }) });
    }
};

export function generateInvaderQueue(difficulty: Difficulty) {
    const count = difficultyVariables[difficulty].invaderSpawns;
    const invaderQueue: InvaderType[] = [];

    Object.keys(count).forEach((key: string) => {
        const invaderType: InvaderType = key as InvaderType;
        const invaderCount: number = count[key as InvaderType];
        for (let i = 0; i < invaderCount; i++)
            invaderQueue.push(invaderType);
    });

    for (let i = invaderQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [invaderQueue[i], invaderQueue[j]] = [invaderQueue[j], invaderQueue[i]];
    }

    return invaderQueue;
}
;
