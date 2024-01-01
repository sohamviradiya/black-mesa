import BarricadeComponent from "../components/units/barricade";
import { BoardState } from "./state";
import { Installation } from "./building";


export class Barricade extends Installation {
    constructor(row_index: number, column_index: number, cellSize: number, cost: number, health: number, rate: number, period: number) {
        super(row_index, column_index, cellSize, health, rate, "BARRICADE", cost, period);
    };
    update(state: BoardState): void {
        if (this.isReady())
            this.health += this.rate; // Regenerate
    }
    component(): JSX.Element {
        return BarricadeComponent({ barricade: this });
    }
}
;
