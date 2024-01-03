import { Building, BuildingTemplate } from "./building";
import { Base, BaseTemplate } from "./buildings/base";
import { Cell, PathCell, SlotCell } from "./cell";
import { Invader, InvaderTemplate, InvaderType } from "./invader";
import { Projectile } from "./projectile";
import { PositionInterface, ScalarInterface } from "./unit";
import { generateGrid } from "./grid";
import { InstallationType } from "./buildings/installation";
import { Generator, GeneratorTemplate } from "./buildings/generator";
import { Barricade, BarricadeTemplate } from "./buildings/barricade";
import { Explosive, ExplosiveTemplate } from "./buildings/explosive";
import { matrixToCells } from "./cell";
import { pathToPositions } from "./geometry";
import { Defense, DefenseTemplate, WeaponType, ScalarTurret, VectorTurret, VectorDefenseTemplate } from "./buildings/defenses";

import difficultyVariables from "../data/difficulty-mappers.json";
import variables from "../data/game-variables.json";
import buildings from "../data/buildings.json";
import defenses from "../data/defenses.json";
import invaders from "../data/invaders.json";

export type CollectionType = "projectiles" | "invaders" | "buildings" | "cells";

export type Difficulty = "ROOKIE" | "CASUAL" | "MASTER" | "VETERAN" | "INSANE";

export class BoardState {
    public frame: number = 0;
    public collections: { projectiles: Projectile[], invaders: Invader[], buildings: Building[], cells: Cell[][] } = { projectiles: [], invaders: [], buildings: [], cells: [] };
    public energy: number = variables["initial-energy"];
    public score: number = 0;
    public gameOver: boolean = false;
    public gameWon: boolean = false;
    public mouse: ScalarInterface = { x: 0, y: 0, width: variables["mouse"]["width"], height: variables["mouse"]["height"] };
    public messages: string[] = [];
    public path: PositionInterface[];
    public cellSize: number = 0;
    private invaderQueue: InvaderType[] = [];
    private invaderPeriod: number = 0;

    constructor(width: number, difficulty: Difficulty) {
        const { rows, columns, turnFactor } = difficultyVariables[difficulty];
        this.setInvaderQueue(difficulty);
        this.invaderPeriod = difficultyVariables[difficulty]["invader-period"];
        this.cellSize = width / columns;
        const { matrix, path, slots } = generateGrid(rows, columns, turnFactor);
        this.collections.cells = matrixToCells(matrix, this.cellSize);

        this.path = pathToPositions(path, this.cellSize);

        const { row_index: base_row_index, column_index: base_column_index } = path[path.length - 1];
        this.addBase(this.collections.cells[base_row_index][base_column_index] as PathCell);

        // slots.forEach((position) => {
        //     const { row_index, column_index } = position;
        //     this.addDefense(this.collections.cells[row_index][column_index] as SlotCell, "LASER");
        // });


        this.messages.push("You have " + this.energy + " energy");
        this.messages.push("Let the invasion begin!");
    }

    update(): this {
        if (this.gameOver || this.gameWon) {
            return this;
        }
        this.frame++;
        if (this.isGameWon()) {
            this.messages.push("You won with a score of " + this.score);
            this.gameWon = true;
            return this;
        }
        this.spawnInvaders();
        this.updateCollections();
        return this;
    }

    components(): JSX.Element[] {
        return [
            ...this.collections.cells.map((row: Cell[]) => row.map((cell: Cell) => cell.component())).flat(),
            ...this.collections.buildings.map((building: Building) => building.component({} as { children: JSX.Element })),
            ...this.collections.invaders.map((invader: Invader) => invader.component()),
            ...this.collections.projectiles.map((projectile: Projectile) => projectile.component()),
        ];
    }

    addMessage(message: string): void {
        if (this.messages.length > 5)
            this.messages.shift();
        this.messages.push(message);
    }

    addDefense(cell: SlotCell, type: WeaponType): void {
        const template = defenses[type];
        if (!this.checkCost(template as BuildingTemplate))
            return;

        const { row_index, column_index } = cell;
        let defense: Defense;
        if (type === "SNIPER")
            defense = new VectorTurret(row_index, column_index, template as VectorDefenseTemplate, this.cellSize);
        else
            defense = new ScalarTurret(row_index, column_index, template as DefenseTemplate, this.cellSize);

        if (cell.occupy(defense)) {
            this.addBuilding(defense);
        }
    }

    addExplosive(cell: PathCell) {
        const template = buildings["EXPLOSIVE"];
        if (!this.checkCost(template as BuildingTemplate))
            return;
        const { row_index, column_index } = cell;
        const explosive = new Explosive(row_index, column_index, template as ExplosiveTemplate, this.cellSize);
        this.collections.buildings.push(explosive);
        if (cell.occupy(explosive)) {
            this.addBuilding(explosive);
        }
    }

    addBarricade(cell: PathCell) {
        this.addInstallation(cell, "BARRICADE");
    }

    private addBase(cell: PathCell) {
        this.addInstallation(cell, "BASE");
    }

    private addInstallation(cell: PathCell, type: InstallationType): void {
        const template = buildings[type];
        if (!this.checkCost(template as BuildingTemplate))
            return;
        const { row_index, column_index } = cell;
        let installation;
        if (template.type === "GENERATOR")
            installation = new Generator(row_index, column_index, template as GeneratorTemplate, this.cellSize);
        else if (template.type === "BARRICADE")
            installation = new Barricade(row_index, column_index, template as BarricadeTemplate, this.cellSize);
        else if (template.type === "BASE")
            installation = new Base(row_index, column_index, template as BaseTemplate, this.cellSize);
        else
            return;

        if (cell.occupy(installation))
            this.addBuilding(installation);
    }

    private addBuilding(building: Building) {
        this.energy -= building.cost;
        this.collections.buildings.push(building);
    }

    private checkCost(template: BuildingTemplate) {
        if (this.energy < template.cost) {
            this.addMessage("Not enough energy to build " + template.type);
            return false;
        }
        return true;
    }

    private isGameWon(): boolean {
        return (this.collections.invaders.length === 0 && this.invaderQueue.length === 0);
    }

    private spawnInvaders() {
        if (this.frame % this.invaderPeriod !== 0 || this.invaderQueue.length === 0)
            return;
        const invaderType: InvaderType = this.invaderQueue.shift() as InvaderType;
        const invader = new Invader(new Array(...this.path), invaders[invaderType] as InvaderTemplate, this.cellSize);
        this.collections.invaders.push(invader);
    }

    private setInvaderQueue(difficulty: Difficulty) {
        const count = difficultyVariables[difficulty].invaderSpawns;
        const invaderQueue: InvaderType[] = [];

        Object.keys(count).forEach((key: string) => {
            const invaderType: InvaderType = key as InvaderType;
            const invaderCount: number = count[key as InvaderType];
            for (let i = 0; i < invaderCount; i++)
                invaderQueue.push(invaderType);
        });

        for (let i = invaderQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [invaderQueue[i], invaderQueue[j]] = [invaderQueue[j], invaderQueue[i]];
        }

        this.invaderQueue = invaderQueue;
    }

    private updateCollections() {
        this.collections.projectiles.forEach((projectile: Projectile) => projectile.update(this));
        this.collections.invaders.forEach((invader: Invader) => invader.update(this));
        this.collections.buildings.forEach((building: Building) => building.update(this));
        this.collections.cells.forEach((row: Cell[]) => row.forEach((cell: Cell) => cell.update(this)));
    }
}