import GeneratorComponent from "../components/units/generator";
import { Installation } from "./building";


export class Generator extends Installation {
    constructor(row_index: number, column_index: number, cellSize: number, cost: number, health: number, rate: number, period: number) {
        super(row_index, column_index, cellSize, health, rate, "GENERATOR", cost, period);
    };
    component(): JSX.Element {
        return GeneratorComponent({ generator: this });
    }
}
;
