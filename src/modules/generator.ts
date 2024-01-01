import GeneratorComponent from "../components/units/generator";
import { BuildingType } from "./buildings/building";
import { Installation } from "./buildings/installation";

const GENERATOR_TEMPLATE = {
    maxHealth: 100,
    rate: 0,
    period: 0,
    cost: 0,
    type: "BASE" as BuildingType,
};

export class Generator extends Installation {
    constructor(row_index: number, column_index: number, cellSize: number) {
        super(row_index, column_index, cellSize, GENERATOR_TEMPLATE);
    };
    component(): JSX.Element {
        return GeneratorComponent({ generator: this });
    }
}
;
