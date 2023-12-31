import { Building } from "./building";
import { Invader } from "./invader";
import { Projectile } from "./projectiles";
import { ScalarInterface } from "./unit";

export type CollectionType = "projectiles" | "invaders" | "buildings";

export class BoardState {
    static nextFrame: number = 0;
    public frame: number = BoardState.nextFrame++;
    constructor(public collections: { projectiles: Projectile[], invaders: Invader[], buildings: Building[] }, public energy: number, public score: number, public lives: number, public gameOver: boolean, public gameWon: boolean, public mouse: ScalarInterface) {
        
    }
    
}