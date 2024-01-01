import { ScalarInterface } from "./unit";
import { Building } from "./building";
import { AlignmentType } from "./unit";
import { Invader } from "./invader";
import { getAngle, isInRadius, isInRange, isInScope } from "./geometry";
import { Projectile } from "./projectiles";
import { BoardState } from "./state";

interface ProjectileTemplate {
    width: number;
    height: number;
    speed: number;
    damage: number;
};


export class Turret extends Building {
    public angle = 0;
    public timer = 0;

    constructor(x: number, y: number, cellSize: number, public cost: number, public period: number, public range: number, private projectileTemplate: ProjectileTemplate) {
        super(x, y, cellSize, "TURRET", cost);
    };
    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void {
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

    update(state: BoardState): void {
        this.timer++;
        if (this.isFireReady()) {
            const target = this.findTarget(state.collections.invaders);
            if (target) {
                this.angle = getAngle(this, target);
                const { width, height, speed, damage } = this.projectileTemplate;
                const projectile = new Projectile(this.x, this.y, width, height, this.angle, speed, target, damage);
                projectile.addSelf(state);
            }
        }
    }
}

export class VectorTurret extends Turret {
    public alignment: AlignmentType;
    constructor(x: number, y: number, cellSize: number, cost: number, period: number, range: number, public scope: number, projectileTemplate: ProjectileTemplate) {
        super(x, y, cellSize, cost, period, range, projectileTemplate);
        this.alignment = "NORTH";
    };
    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void {
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

export class Explosive extends Building {
    public triggered: boolean = false;
    constructor(x: number, y: number, cellSize: number, public cost: number, public damage: number, public radius: number) {
        super(x, y, cellSize, "EXPLOSIVE", cost);
    };
    draw(context: CanvasRenderingContext2D, mouse: ScalarInterface): void {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(state: BoardState): void {
        if (this.triggered) {
            state.collections.invaders.forEach((invader: Invader) => {
                if (isInRadius(this, invader)) {
                    invader.takeDamage(this.damage);
                }
            });
            this.removeSelf(state);
        }

        state.collections.invaders.forEach((invader: Invader) => {
            if (isInRadius(this, invader)) {
                this.triggered = true;
            }
        });
    }
}
;
