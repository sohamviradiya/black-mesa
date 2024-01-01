
import { Building } from "./building";
import { AlignmentType } from "./unit";
import { Invader } from "./invader";
import { collision, getAngle, isInRadius, isInRange, isInScope } from "./geometry";
import { Projectile } from "./projectiles";
import { BoardState } from "./state";
import ScalarTurretComponent from "../components/units/scalar-turret";
import VectorTurretComponent from "../components/units/vector-turret";
import ExplosiveComponent from "../components/units/explosive";

interface ProjectileTemplate {
    width: number;
    height: number;
    speed: number;
    damage: number;
};


export abstract class Turret extends Building {
    public angle = 0;
    public timer = 0;

    constructor(row_index: number, column_index: number, cellSize: number, public cost: number, public period: number, public range: number, private projectileTemplate: ProjectileTemplate) {
        super(row_index, column_index, cellSize, "TURRET", cost);
    };
    abstract findTarget(enemies: Invader[]): Invader | null;

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

export class ScalarTurret extends Turret {
    public alignment: AlignmentType;
    constructor(row_index: number, column_index: number, cellSize: number, cost: number, period: number, range: number, projectileTemplate: ProjectileTemplate) {
        super(row_index, column_index, cellSize, cost, period, range, projectileTemplate);
        this.alignment = "NORTH";
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
    component(): JSX.Element {
        return ScalarTurretComponent({ turret: this });
    }
}

export class VectorTurret extends Turret {
    public alignment: AlignmentType;
    constructor(row_index: number, column_index: number, cellSize: number, cost: number, period: number, range: number, public scope: number, projectileTemplate: ProjectileTemplate) {
        super(row_index, column_index, cellSize, cost, period, range, projectileTemplate);
        this.alignment = "NORTH";
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
    component(): JSX.Element {
        return VectorTurretComponent({ turret: this });
    }
}

export class Explosive extends Building {
    public triggered: boolean = false;
    constructor(row_index: number, column_index: number, cellSize: number, public cost: number, public damage: number, public radius: number) {
        super(row_index, column_index, cellSize, "EXPLOSIVE", cost);
    };

    update(state: BoardState): void {
        if (this.triggered) {
            this.explode(state.collections.invaders);
            this.removeSelf(state);
        }

        state.collections.invaders.forEach((invader: Invader) => {
            if (collision(this, invader)) {
                this.triggered = true;
                return;
            }
        });
    }

    component(): JSX.Element {
        return ExplosiveComponent({ explosive: this });
    }

    private explode(invaders: Invader[]) {
        invaders.forEach((invader: Invader) => {
            if (isInRadius(this, invader)) {
                invader.takeDamage(this.damage);
            }
        });
    }
};
