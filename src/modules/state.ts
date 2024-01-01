import { Building } from "./buildings/building";
import { Base } from "./buildings/base";
import { Cell } from "./cell";
import { Invader, InvaderTemplate } from "./invader";
import { Projectile } from "./projectiles";
import { PositionInterface, ScalarInterface } from "./unit";

export type CollectionType = "projectiles" | "invaders" | "buildings" | "cells";

export type InvaderSpawn = {
    template: InvaderTemplate,
    timeout: number,
};

export class BoardState {
    static nextFrame: number = 0;
    public frame: number = BoardState.nextFrame++;
    constructor(public collections: { projectiles: Projectile[], invaders: Invader[], base: Base, buildings: Building[], cells: Cell[] }, public energy: number, public score: number, public gameOver: boolean, public gameWon: boolean, public mouse: ScalarInterface, public invaderSpawns: InvaderSpawn[],public path: PositionInterface[]) {
        // TODO: set up invader spawning
    };
    update(): void {
        if (this.gameOver || this.gameWon) {
            return;
        }
        if (this.isGameWon()) {
            this.gameWon = true;
            return;
        }

        this.collections.projectiles.forEach((projectile: Projectile) => projectile.update(this));
        this.collections.invaders.forEach((invader: Invader) => invader.update(this));
        this.collections.buildings.forEach((building: Building) => building.update(this));
        this.collections.cells.forEach((cell: Cell) => cell.update(this));

    }
    isGameWon(): boolean {
        return (this.collections.invaders.length === 0 && this.invaderSpawns.length === 0);
    }

    launchInvader() {
        const { timeout, template } = this.invaderSpawns[0];
        if (timeout === this.frame) {
            this.collections.invaders.push(new Invader(this.path, template));
            this.invaderSpawns.shift();
        }
    }

    components(): JSX.Element[] {
        return [
            this.collections.base.component(),
            ...this.collections.buildings.map((building: Building) => building.component()),
            ...this.collections.cells.map((cell: Cell) => cell.component()),
            ...this.collections.invaders.map((invader: Invader) => invader.component()),
            ...this.collections.projectiles.map((projectile: Projectile) => projectile.component()),
        ];
    }
}

