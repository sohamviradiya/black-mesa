import GeneratorComponent from "../../components/units/buildings/generator";
import { Installation, InstallationTemplate } from "./installation";

export interface GeneratorTemplate extends InstallationTemplate {
    type: "GENERATOR";
};

export class Generator extends Installation {
    constructor(row_index: number, column_index: number, public template: GeneratorTemplate, cellSize: number) {
        super(row_index, column_index, template, cellSize);
    };
    component(): JSX.Element {
        return GeneratorComponent({ generator: this });
    }
}
;
