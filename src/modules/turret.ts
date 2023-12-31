import { StateInterface } from "./unit";
import { Building } from "./building";
import { AlignmentType } from "./unit";
import { Invader } from "./invader";
import { isInRange, isInScope } from "./geometry";


export class Turret extends Building {
    public target: Invader | null = null;
    public angle = 0;
    public timer = 0;
    constructor(x: number, y: number, cellSize: number, public cost: number, public period: number, public range: number) {
        super(x, y, cellSize, "TURRET", cost);
    };
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    findTarget(enemies: Invader[]) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].dead)
                continue;
            if (isInRange(this, enemies[i])) {
                return enemies[i];
            }
        }
        return this.target;
    };

    isFireReady(): boolean {
        return this.timer % Math.floor(this.period) === 0;
    };

    update(state: any): void {
        this.timer++;
        if (this.target?.dead)
            this.target = null;
        if (!this.target)
            this.target = this.findTarget(state.enemies);
        if (this.target) {
            this.angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
            if (this.isFireReady()) {
                state.projectiles.push({});
            }
        }
    }
}

export class VectorTurret extends Turret {
    public alignment: AlignmentType;
    constructor(x: number, y: number, cellSize: number, public cost: number, public period: number, public range: number, public scope: number) {
        super(x, y, cellSize, cost, period, range);
        this.alignment = "NORTH";
    };
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    findTarget(enemies: Invader[]) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].dead)
                continue;
            if (isInScope(this, enemies[i])) {
                return enemies[i];
            }
        }
        return this.target;
    };
}