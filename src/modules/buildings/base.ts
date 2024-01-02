import BaseComponent from "../../components/units/base";
import { BoardState } from "../state";
import { Installation, InstallationTemplate } from "./installation";

export interface BaseTemplate extends InstallationTemplate {
    type: "BASE";
};

export class Base extends Installation {
    constructor(row_index: number, column_index: number, public template: BaseTemplate) {
        super(row_index, column_index, template);
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
