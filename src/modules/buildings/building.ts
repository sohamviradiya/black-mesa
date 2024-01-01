import { BoardState, CollectionType } from "../state";
import { Unit } from "../unit";


export enum BuildingTypes {
    "BASE",
    "TURRET",
    "EXPLOSIVE",
    "GENERATOR",
    "BARRICADE",
};

export type BuildingType = keyof typeof BuildingTypes;

export abstract class Building extends Unit {
    public width: number;
    public height: number;
    collection: CollectionType = "buildings";
    constructor(row_index: number, column_index: number, cellSize: number, public type: BuildingType, public cost: number) {
        super(row_index, column_index, cellSize);
        this.width = cellSize;
        this.height = cellSize;
    }
    addSelf(state: BoardState): void {
        state.collections.buildings.push(this);
    }
    removeSelf(state: BoardState): void {
        state.collections.buildings = state.collections.buildings.filter((building: Building) => building.id !== this.id);
    }
}


