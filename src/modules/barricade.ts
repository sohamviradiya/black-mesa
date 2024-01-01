import BarricadeComponent from "../components/units/barricade";
import { BoardState } from "./state";
import { BuildingType } from "./building";
import { Installation } from "./installation";

const BARRICADE_TEMPLATE = {
    maxHealth: 500,
    rate: 1,
    period: 10,
    cost: 10,
    type: "BARRICADE" as BuildingType,
};

export class Barricade extends Installation {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, BARRICADE_TEMPLATE);
    };
    update(state: BoardState): void {
        if (this.isReady())
            this.health += this.template.rate; // Regenerate
    }
    component(): JSX.Element {
        return BarricadeComponent({ barricade: this });
    }
}
;
