import { BoardState, CollectionType } from "../state";
import { ScalarUnit } from "../unit";


export enum BuildingTypes {
    "BASE",
    "DEFENSE",
    "EXPLOSIVE",
    "GENERATOR",
    "BARRICADE",
};

export type BuildingType = keyof typeof BuildingTypes;

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
    constructor(row_index: number, column_index: number, cellSize: number, template: BuildingTemplate) {
        super(row_index, column_index, cellSize);
        this.width = cellSize;
        this.height = cellSize;
        this.type = template.type;
        this.cost = template.cost;
    }
    addSelf(state: BoardState): void {
        state.collections.buildings.push(this);
    }
    removeSelf(state: BoardState): void {
        state.collections.buildings = state.collections.buildings.filter((building: Building) => building.id !== this.id);
    }
}


