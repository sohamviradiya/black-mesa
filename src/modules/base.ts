import BaseComponent from "../components/units/base";
import { BoardState } from "./state";
import { BuildingType } from "./building";
import { Installation } from "./installation";

const BASE_TEMPLATE = {
    maxHealth: 100,
    rate: 0,
    period: 0,
    cost: 0,
    type: "BASE" as BuildingType,
};

export class Base extends Installation {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, BASE_TEMPLATE);
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

};
