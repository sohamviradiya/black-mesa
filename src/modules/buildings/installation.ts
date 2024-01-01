import { BoardState } from "../state";
import { BuildingType, Building } from "./building";


export interface InstallationTemplate {
    maxHealth: number;
    rate: number;
    period: number;
    cost: number;
    type: BuildingType;
}
;

export abstract class Installation extends Building {
    active: boolean = true;
    timer: number = 0;
    health: number;
    constructor(row_index: number, column_index: number, cellSize: number, public template: InstallationTemplate) {
        super(row_index, column_index, cellSize, template.type, template.cost);
        this.health = template.maxHealth;
    };

    takeDamage(damage: number): void {
        if (!this.active)
            return;
        this.health -= damage;
        if (this.health <= 0)
            this.active = false;
    };
    isReady(): boolean {
        if (this.timer % this.template.period === 0)
            return true;
        return false;
    };

    update(state: BoardState): void {
        if (!this.active) {
            this.removeSelf(state);
            return;
        }
        this.timer++;
        if (this.isReady())
            state.energy += this.template.rate;
    }
}
;