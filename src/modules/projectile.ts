import ProjectileComponent from "../components/units/projectile";
import { collision } from "./geometry";
import { Invader } from "./invader";
import { BoardState, CollectionType } from "./state";
import { VectorUnit } from "./unit";

export interface ProjectileTemplate {
    speed: number;
    damage: number;
    widthFactor: number;
    heightFactor: number;
};

export class Projectile extends VectorUnit {
    public active: boolean = true;
    collection: CollectionType = "projectiles";
    constructor(x: number, y: number, angle: number, public target: Invader, public template: ProjectileTemplate, cellSize: number) {
        super(x, y, template.widthFactor * cellSize, template.heightFactor * cellSize, angle);
    }

    update(state: BoardState): void {
        if (!this.active) {
            this.removeSelf(state);
            return;
        }

        if (this.target.dead) {
            this.active = false;
            return;
        }

        if (collision(this, this.target)) {
            this.target.takeDamage(this.template.damage);
            this.active = false;
            return;
        }

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.template.speed) {
            this.x = this.target.x;
            this.y = this.target.y;
            return;
        }

        this.x += dx / distance * this.template.speed;
        this.y += dy / distance * this.template.speed;
        this.angle = Math.atan2(dy, dx);
    };

    addSelf(state: BoardState): void {
        state.collections.projectiles.push(this);
    }
    removeSelf(state: BoardState): void {
        state.collections.projectiles = state.collections.projectiles.filter((projectile: Projectile) => projectile.id !== this.id);
    }

    component(): JSX.Element {
        return super.component({ children: ProjectileComponent({ projectile: this }) });
    }
}