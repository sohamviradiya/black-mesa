import { Base, Building } from "./building";
import { Cell } from "./cell";
import { Invader } from "./invader";
import { Projectile } from "./projectiles";
import { ScalarInterface } from "./unit";

export type CollectionType = "projectiles" | "invaders" | "buildings" | "cells";

export class BoardState {
    static nextFrame: number = 0;
    public frame: number = BoardState.nextFrame++;
    constructor(public collections: { projectiles: Projectile[], invaders: Invader[], base: Base, buildings: Building[], cells: Cell[] }, public energy: number, public score: number, public lives: number, public gameOver: boolean, public gameWon: boolean, public mouse: ScalarInterface) {

    }
    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'white';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        this.collections.cells.forEach((cell: Cell) => cell.draw(context, this.mouse));
        this.collections.buildings.forEach((building: Building) => building.draw(context, this.mouse));
        this.collections.invaders.forEach((invader: Invader) => invader.draw(context));
        this.collections.projectiles.forEach((projectile: Projectile) => projectile.draw(context));
    }

}