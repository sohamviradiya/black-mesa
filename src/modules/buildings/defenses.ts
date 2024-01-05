
import { Building, BuildingTemplate } from "../building";
import { AlignmentType } from "../unit";
import { Invader } from "../invader";
import { getAngle, isInRange, isInScope } from "../geometry";
import { Projectile, ProjectileTemplate } from "../projectile";
import { BoardState } from "../state";
import ScalarTurretComponent from "../../components/units/buildings/defenses/scalar-turret";
import VectorTurretComponent from "../../components/units/buildings/defenses/vector-turret";
import DefenseComponent from "../../components/units/buildings/defense";
import { ReactNode } from "react";

export const WeaponTypes = ["LASER", "SNIPER", "MISSILE_LAUNCHER", "MACHINE_GUN", "SHOTGUN"] as const;

export type WeaponType = typeof WeaponTypes[number];

export interface DefenseTemplate extends BuildingTemplate {
    type: "DEFENSE";
    weapon: WeaponType;
    period: number;
    rangeFactor: number;
    projectileTemplate: ProjectileTemplate;
};

export interface VectorDefenseTemplate extends DefenseTemplate {
    scope: number;
};


export abstract class Defense extends Building {
    public angle = Math.PI;
    public timer = 0;
    public range = 0;
    constructor(row_index: number, column_index: number, public template: DefenseTemplate, cellSize: number) {
        super(row_index, column_index, template, cellSize);
        this.range = template.rangeFactor * cellSize;
    };
    abstract findTarget(enemies: Invader[]): Invader | null;

    update(state: BoardState): void {
        this.timer++;
        if (!this.isFireReady())
            return;
        const target = this.findTarget(state.collections.invaders);
        if (!target)
            return;
        this.angle = getAngle(this, target);
        const projectile = new Projectile(this.x, this.y, this.angle, target, this.template.projectileTemplate, state.cellSize);
        projectile.addSelf(state);
    }

    isFireReady(): boolean {
        return this.timer % this.template.period === 0;
    };

    component({ children, demolishBuilding }: { children: ReactNode, demolishBuilding: (building: Building) => void }): JSX.Element {
        return super.component({ children: DefenseComponent({ defense: this, children }), demolishBuilding });
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
    component({ demolishBuilding }: { demolishBuilding: (building: Building) => void }): JSX.Element {
        return super.component({ children: ScalarTurretComponent({ turret: this }), demolishBuilding });
    }
}

export class VectorTurret extends Defense {
    public alignment: AlignmentType;
    constructor(row_index: number, column_index: number, public template: VectorDefenseTemplate, cellSize: number) {
        super(row_index, column_index, template, cellSize);
        this.alignment = "WEST";
        this.angle = -Math.PI;
    };

    setAlignment() {
        if (this.alignment === "WEST") {
            this.alignment = "NORTH";
            this.angle = Math.PI / 2;
        }
        else if (this.alignment === "NORTH") {
            this.alignment = "EAST";
            this.angle = 0;
        }
        else if (this.alignment === "EAST") {
            this.alignment = "SOUTH";
            this.angle = -Math.PI / 2;
        }
        else if (this.alignment === "SOUTH") {
            this.alignment = "WEST";
            this.angle = -Math.PI;
        }
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

    component({ demolishBuilding }: { demolishBuilding: (building: Building) => void }): JSX.Element {
        return super.component({ children: VectorTurretComponent({ turret: this }), demolishBuilding });
    }
}


