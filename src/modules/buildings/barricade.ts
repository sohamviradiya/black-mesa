import BarricadeComponent from "../../components/units/buildings/barricade";
import { Building } from "../building";
import { BoardState } from "../state";
import { Installation, InstallationTemplate } from "./installation";

export interface BarricadeTemplate extends InstallationTemplate {
    type: "BARRICADE",
};

export class Barricade extends Installation {
    constructor(row_index: number, column_index: number, public template: BarricadeTemplate, cellSize: number) {
        super(row_index, column_index, template, cellSize);
        this.health = this.template.maxHealth - 100;
    };
    isReady(): boolean {
        return this.health < this.template.maxHealth && super.isReady();
    };

    update(state: BoardState): void {
        if (!this.active) {
            state.addMessage("Your " + this.type + " building was destroyed");
            this.removeSelf(state);
            return;
        }
        this.timer++;
        if (this.isReady())
            this.health += this.template.rate; // Regenerate
    }

    component({ demolishBuilding }: { demolishBuilding: (building: Building) => void }): JSX.Element {
        return super.component({ children: BarricadeComponent({ barricade: this }), demolishBuilding });
    }
};
