import { Base, Building } from "./building";
import { Cell } from "./cell";
import { Invader } from "./invader";
import { Projectile } from "./projectiles";
import { ScalarInterface } from "./unit";

export type CollectionType = "projectiles" | "invaders" | "buildings" | "cells";

export class BoardState {
    static nextFrame: number = 0;
    public frame: number = BoardState.nextFrame++;
    constructor(public collections: { projectiles: Projectile[], invaders: Invader[], base: Base, buildings: Building[], cells: Cell[] }, public energy: number, public score: number, public gameOver: boolean, public gameWon: boolean, public mouse: ScalarInterface) {

    }
}

