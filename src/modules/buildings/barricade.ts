import BarricadeComponent from "../../components/units/buildings/barricade";
import { BoardState } from "../state";
import { Installation, InstallationTemplate } from "./installation";

export interface BarricadeTemplate extends InstallationTemplate {
    type: "BARRICADE",
};

export class Barricade extends Installation {
    constructor(row_index: number, column_index: number, public template: BarricadeTemplate, cellSize: number) {
        super(row_index, column_index, template, cellSize);
    };
    isReady(): boolean {
        return this.health < this.template.maxHealth && this.health > 0;
    };

    update(state: BoardState): void {
        if (this.isReady())
            this.health += this.template.rate; // Regenerate
    }
    component(): JSX.Element {
        return super.component({ children: BarricadeComponent({ barricade: this }) });
    }
};
