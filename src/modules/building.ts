import { BoardState, CollectionType } from "./state";
import { ScalarInterface, Unit } from "./unit";


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

    update(state: BoardState): void {
        if (!this.active) {
            this.removeSelf(state);
            return;
        }
        this.timer++;
        if (this.timer >= this.period) {
            state.energy += this.rate;
            this.timer = 0;
        };
    }
};

export class Base extends Installation {
    constructor(x: number, y: number, cellSize: number, health: number, rate: number, period: number) {
        super(x, y, cellSize, health, rate, "BASE", 0, period);
    };

    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    addSelf(state: BoardState): void {
        state.collections.base = this;
    }

    update(state: BoardState): void {
        if (!this.active)
            state.gameOver = true;
        super.update(state);
    }

};

export class Generator extends Installation {
    constructor(x: number, y: number, cellSize: number, cost: number, health: number, rate: number, period: number) {
        super(x, y, cellSize, health, rate, "GENERATOR", cost, period);
    };
    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};

export class Barricade extends Installation {
    constructor(x: number, y: number, cellSize: number, cost: number, health: number) {
        super(x, y, cellSize, health, 0, "BARRICADE", cost, 1);
    };
    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void {
        context.fillStyle = 'brown';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(state: BoardState): void {
        
    }
};



