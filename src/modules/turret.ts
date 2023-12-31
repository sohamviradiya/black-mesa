import { StateInterface } from "./unit";
import { Building } from "./building";
import { AlignmentType } from "./unit";


export class Turret extends Building {
    public target: any | null = null;
    constructor(x: number, y: number, cellSize: number, public cost: number, public rate: number, public range: number) {
        super(x, y, cellSize, "TURRET", cost);
    };
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    findTarget(enemies: any[]): void {

    };
}

export class VectorTurret extends Turret {
    public alignment: AlignmentType;
    constructor(x: number, y: number, cellSize: number, public cost: number, public rate: number, public range: number, public angle: number) {
        super(x, y, cellSize, cost, rate, range);
        this.alignment = "NORTH";
    };
    draw(context: CanvasRenderingContext2D, mouse: StateInterface): void {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
    };
    findTarget(enemies: any[]): void {


    };
}