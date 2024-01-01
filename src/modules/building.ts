import BarricadeComponent from "../components/units/barricade";
import BaseComponent from "../components/units/base";
import GeneratorComponent from "../components/units/generator";
import { BoardState, CollectionType } from "./state";
import { Unit } from "./unit";


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
    constructor(public x: number, public y: number, cellSize: number, public type: BuildingType, public cost: number = 0) {
        super(x, y, cellSize);
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

export abstract class Installation extends Building {
    active: boolean = true;
    timer: number = 0;
    constructor(x: number, y: number, cellSize: number, public health: number, public rate: number, public type: BuildingType, public cost: number, public period: number) {
        super(x, y, cellSize, type, cost);
    };

    takeDamage(damage: number): void {
        if (!this.active)
            return;
        this.health -= damage;
        if (this.health <= 0)
            this.active = false;
    };
    isReady(): boolean {
        if (this.timer % this.period === 0)
            return true;
        return false;
    };

    update(state: BoardState): void {
        if (!this.active) {
            this.removeSelf(state);
            return;
        }
        this.timer++;
        if (this.isReady())
            state.energy += this.rate;
    }
};

export class Base extends Installation {
    constructor(x: number, y: number, cellSize: number, health: number, rate: number, period: number) {
        super(x, y, cellSize, health, rate, "BASE", 0, period);
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

export class Generator extends Installation {
    constructor(x: number, y: number, cellSize: number, cost: number, health: number, rate: number, period: number) {
        super(x, y, cellSize, health, rate, "GENERATOR", cost, period);
    };
    component(): JSX.Element {
        return GeneratorComponent({ generator: this });
    }
};

export class Barricade extends Installation {
    constructor(x: number, y: number, cellSize: number, cost: number, health: number, rate: number, period: number) {
        super(x, y, cellSize, health, rate, "BARRICADE", cost, period);
    };
    update(state: BoardState): void {
        if (this.isReady())
            this.health += this.rate; // Regenerate
    }
    component(): JSX.Element {
        return BarricadeComponent({ barricade: this });
    }
};



