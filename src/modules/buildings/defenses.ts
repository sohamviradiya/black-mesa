
import { Building, BuildingTemplate } from "./building";
import { AlignmentType } from "../unit";
import { Invader } from "../invader";
import { getAngle, isInRange, isInScope } from "../geometry";
import { Projectile, ProjectileTemplate } from "../projectiles";
import { BoardState } from "../state";
import ScalarTurretComponent from "../../components/units/scalar-turret";
import VectorTurretComponent from "../../components/units/vector-turret";

export interface TurretTemplate extends BuildingTemplate {
    type: "DEFENSE";
    period: number;
    range: number;
    projectileTemplate: ProjectileTemplate;
};

export interface VectorTurretTemplate extends TurretTemplate {
    scope: number;
};


export abstract class Defense extends Building {
    public angle = 0;
    public timer = 0;
    constructor(row_index: number, column_index: number, cellSize: number, public template: TurretTemplate) {
        super(row_index, column_index, cellSize, template);
    };
    abstract findTarget(enemies: Invader[]): Invader | null;

    isFireReady(): boolean {
        return this.timer % this.template.period === 0;
    };

    update(state: BoardState): void {
        this.timer++;
        if (this.isFireReady()) {
            const target = this.findTarget(state.collections.invaders);
            if (target) {
                this.angle = getAngle(this, target);
                const projectile = new Projectile(this.x, this.y, this.angle, target, this.template.projectileTemplate);
                projectile.addSelf(state);
            }
        }
    }
}

export class ScalarTurret extends Defense {

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

export class VectorTurret extends Defense {
    public alignment: AlignmentType;
    constructor(row_index: number, column_index: number, cellSize: number, public template: VectorTurretTemplate) {
        super(row_index, column_index, cellSize, template);
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


