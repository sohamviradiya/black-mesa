import BaseComponent from "../../components/units/buildings/base";
import { BoardState } from "../state";
import { Installation, InstallationTemplate } from "./installation";
import { Building } from "../building";

export interface BaseTemplate extends InstallationTemplate {
    type: "BASE";
};

export class Base extends Installation {
    constructor(row_index: number, column_index: number, public template: BaseTemplate, cellSize: number) {
        super(row_index, column_index, template, cellSize);
    };

    update(state: BoardState): void {
        if (!this.active)
            state.gameOver = true;
        super.update(state);
    }

    dismantle(state: BoardState): void {

    }

    component({ demolishBuilding }: { demolishBuilding: (building: Building) => void }): JSX.Element {
        return super.component({ children: BaseComponent({ base: this }), demolishBuilding });
    };

};
