import { Building } from "./building";
import { Base } from "./base";
import { Cell } from "./cell";
import { Invader } from "./invader";
import { Projectile } from "./projectiles";
import { ScalarInterface } from "./unit";

export type CollectionType = "projectiles" | "invaders" | "buildings" | "cells";

export class BoardState {
    static nextFrame: number = 0;
    public frame: number = BoardState.nextFrame++;
    constructor(public collections: { projectiles: Projectile[], invaders: Invader[], base: Base, buildings: Building[], cells: Cell[] }, public energy: number, public score: number, public gameOver: boolean, public gameWon: boolean, public mouse: ScalarInterface) {
        // TODO: set up invader spawning
    };
    update(state: BoardState): void {
        state.collections.projectiles.forEach((projectile: Projectile) => projectile.update(state));
        state.collections.invaders.forEach((invader: Invader) => invader.update(state));
        state.collections.buildings.forEach((building: Building) => building.update(state));
        state.collections.cells.forEach((cell: Cell) => cell.update(state));
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

