import { BoardState, CollectionType } from "./state";
import { ScalarUnit } from "./unit";
import variables from "../data/game-variables.json";
import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";
import BuildingComponent from "../components/units/building";
import { OccupiableCell } from "./cell";

export const BuildingTypes = ["BASE", "DEFENSE", "EXPLOSIVE", "GENERATOR", "BARRICADE",] as const;

export type BuildingType = typeof BuildingTypes[number];

export interface BuildingTemplate {
    cost: number;
    type: BuildingType;
    description: string;
}

export abstract class Building extends ScalarUnit {
    public width: number;
    public height: number;
    public type: BuildingType;
    public cost: number;
    collection: CollectionType = "buildings";
    constructor(public row_index: number, public column_index: number, template: BuildingTemplate, cellSize: number) {
        super(row_index, column_index, cellSize);
        this.width = cellSize;
        this.height = cellSize;
        this.type = template.type;
        this.cost = template.cost;
    }

    addSelf(state: BoardState): void {
        state.addMessage("You built a " + this.type + " for " + this.cost + " energy");
        state.collections.buildings.push(this);
    }
    removeSelf(state: BoardState): void {
        (state.collections.cells[this.row_index][this.column_index] as OccupiableCell).removeOccupier();
        state.collections.buildings = state.collections.buildings.filter((building: Building) => building.id !== this.id);
    }

    dismantle(state: BoardState): void {
        state.addMessage("You dismantled a " + this.type + " for " + variables["dismantle-factor"] * this.cost + " energy");
        state.energy += variables["dismantle-factor"] * this.cost;
        this.removeSelf(state);
    }

    component({ children, demolishBuilding }: { children?: ReactNode, demolishBuilding: (building: Building) => void }): JSX.Element {
        return super.component({ children: BuildingComponent({ building: this, children, demolishBuilding }) });
    }
}


