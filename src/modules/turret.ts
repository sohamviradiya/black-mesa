import { StateInterface } from "./unit";
import { Building } from "./building";
import { AlignmentType } from "./unit";
import { Invader } from "./invader";
import { getAngle, isInRange, isInScope } from "./geometry";
import { Projectile } from "./projectiles";


export class Turret extends Building {
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
        return null;
    };

    isFireReady(): boolean {
        return this.timer % this.period === 0;
    };

    update(state: any): void {
        this.timer++;
        if (this.isFireReady()) {
            const target = this.findTarget(state.enemies);
            if (target) {
                this.angle = getAngle(this, target);
                state.projectiles.push(new Projectile(this.x, this.y, 20, 10, this.angle, 100, target, 100)); // TODO: abstract the projectile
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
        return null;
    };
}