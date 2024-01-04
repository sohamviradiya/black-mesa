import { Building, BuildingTemplate } from "../building";
import { Invader } from "../invader";
import { collision, isInRadius } from "../geometry";
import { BoardState } from "../state";
import ExplosiveComponent from "../../components/units/buildings/defenses/explosive";

export interface ExplosiveTemplate extends BuildingTemplate {
    type: "EXPLOSIVE";
    damage: number;
    radiusFactor: number;
    duration: number;
};

export class Explosive extends Building {
    public triggered: boolean = false;
    public radius: number;
    public timer: number = 0;
    public dead: boolean = false;
    constructor(row_index: number, column_index: number, public template: ExplosiveTemplate, cellSize: number) {
        super(row_index, column_index, template, cellSize);
        this.timer = template.duration;
        this.radius = template.radiusFactor * cellSize;
    };
    update(state: BoardState): void {
        if (this.dead) {
            this.removeSelf(state);
            return;
        }

        if (this.timer === 0) {
            this.dead = true;
            return;
        }

        if (this.triggered) {
            this.timer--;
            this.explode(state.collections.invaders);
            return;
        }

        state.collections.invaders.forEach((invader: Invader) => {
            if (collision(this, invader)) {
                this.triggered = true;
                return;
            }
        });
    }

    component(): JSX.Element {
        return super.component({ children: ExplosiveComponent({ explosive: this }) });
    }

    private explode(invaders: Invader[]) {
        invaders.forEach((invader: Invader) => {
            if (isInRadius(this, invader))
                invader.takeDamage(this.template.damage);
        });
    }
};
