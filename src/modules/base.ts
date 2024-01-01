import BaseComponent from "../components/units/base";
import { BoardState } from "./state";
import { Installation } from "./building";


export class Base extends Installation {
    constructor(row_index: number, column_index: number, cellSize: number, health: number, rate: number, period: number) {
        super(row_index, column_index, cellSize, health, rate, "BASE", 0, period);
    };

    addSelf(state: BoardState): void {
        state.collections.base = this;
    }

    update(state: BoardState): void {
        if (!this.active)
            state.gameOver = true;
        super.update(state);
    }

    component(): JSX.Element {
        return BaseComponent({ base: this });
    };

}
;
