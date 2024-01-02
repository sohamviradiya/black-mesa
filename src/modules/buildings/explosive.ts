import { Building, BuildingTemplate } from "./building";
import { Invader } from "../invader";
import { collision, isInRadius } from "../geometry";
import { BoardState } from "../state";
import ExplosiveComponent from "../../components/units/explosive";

export interface ExplosiveTemplate extends BuildingTemplate {
    type: "EXPLOSIVE";
    damage: number;
    radius: number;
};

export class Explosive extends Building {
    public triggered: boolean = false;
    constructor(row_index: number, column_index: number, cellSize: number, public template: ExplosiveTemplate) {
        super(row_index, column_index, cellSize, template);
    };

    update(state: BoardState): void {
        if (this.triggered) {
            this.explode(state.collections.invaders);
            this.removeSelf(state);
        }

        state.collections.invaders.forEach((invader: Invader) => {
            if (collision(this, invader)) {
                this.triggered = true;
                return;
            }
        });
    }

    component(): JSX.Element {
        return ExplosiveComponent({ explosive: this });
    }

    private explode(invaders: Invader[]) {
        invaders.forEach((invader: Invader) => {
            if (isInRadius(this, invader))
                invader.takeDamage(this.template.damage);
        });
    }
}
;
