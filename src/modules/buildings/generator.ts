import GeneratorComponent from "../../components/units/generator";
import { Installation, InstallationTemplate } from "./installation";

export interface GeneratorTemplate extends InstallationTemplate {
    type: "GENERATOR";
};

export class Generator extends Installation {
    constructor(row_index: number, column_index: number, public template: GeneratorTemplate) {
        super(row_index, column_index, template);
    };
    component(): JSX.Element {
        return GeneratorComponent({ generator: this });
    }
}
;
