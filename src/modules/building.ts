import { isInRadius } from "./geometry";
import { StateInterface, Unit } from "./unit";


export enum BuildingTypes {
    "BASE",
    "TURRET",
    "EXPLOSIVE",
    "GENERATOR",
};

export type BuildingType = keyof typeof BuildingTypes;

export abstract class Building extends Unit {
    public width: number;
    public height: number;
    constructor(public x: number, public y: number, cellSize: number, public type: BuildingType, public cost: number = 0) {
        super(x, y, cellSize);
        this.width = cellSize;
        this.height = cellSize;
    }
}

abstract class Installation extends Building {
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
    update(state: any): void {
        if (!this.active)
            return;
        this.timer++;
        if (this.timer >= this.period) {
            state.energy += this.rate;
            this.timer = 0;
        };
    }
};

export class Base extends Installation {
    constructor(x: number, y: number, cellSize: number, cost: number, health: number, rate: number, period: number) {
        super(x, y, cellSize, health, rate, "BASE", cost, period);
    };

    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};

export class Generator extends Installation {
    constructor(x: number, y: number, cellSize: number, cost: number, health: number, rate: number, period: number) {
        super(x, y, cellSize, health, rate, "GENERATOR", cost, period);
    };
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};


export class Explosive extends Building {
    public triggered: boolean = false;
    constructor(x: number, y: number, cellSize: number, public cost: number, public damage: number, public radius: number) {
        super(x, y, cellSize, "EXPLOSIVE", cost);
    };
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(state: any): void {
        if (this.triggered) {
            state.invaders.forEach((invader: any) => {
                if (isInRadius(this, invader)) {
                    invader.takeDamage(this.damage);
                }
            });
        }

        state.invaders.forEach((invader: any) => {
            if (isInRadius(this, invader)) {
                this.triggered = true;
            }
        });
    }
};


