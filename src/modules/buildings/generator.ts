import GeneratorComponent from "../../components/units/buildings/generator";
import { Building } from "../building";
import { Installation, InstallationTemplate } from "./installation";

export interface GeneratorTemplate extends InstallationTemplate {
    type: "GENERATOR";
};

export class Generator extends Installation {
    constructor(row_index: number, column_index: number, public template: GeneratorTemplate, cellSize: number) {
        super(row_index, column_index, template, cellSize);
    };

    component({ demolishBuilding }: { demolishBuilding: (building: Building) => void }): JSX.Element {
        return super.component({ children: GeneratorComponent({ generator: this }), demolishBuilding });
    }
};
