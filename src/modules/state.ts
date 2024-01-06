import { Building, BuildingTemplate, BuildingType, BuildingTypes } from "./building";
import { Base, BaseTemplate } from "./buildings/base";
import { Cell, PathCell, SlotCell } from "./cell";
import { Invader, InvaderTemplate, InvaderType } from "./invader";
import { Projectile } from "./projectile";
import { PositionInterface } from "./unit";
import { generateGrid } from "./grid";
import { InstallationType } from "./buildings/installation";
import { Generator, GeneratorTemplate } from "./buildings/generator";
import { Barricade, BarricadeTemplate } from "./buildings/barricade";
import { Explosive, ExplosiveTemplate } from "./buildings/explosive";
import { matrixToCells } from "./cell";
import { pathToPositions } from "./geometry";
import { Defense, DefenseTemplate, WeaponType, ScalarTurret, VectorTurret, VectorDefenseTemplate, WeaponTypes } from "./buildings/defenses";

import difficultyVariables from "../data/difficulty-mappers.json";
import buildings from "../data/buildings.json";
import defenses from "../data/defenses.json";
import invaders from "../data/invaders.json";
import { generateInvaderQueue } from "./invader";
import { ReactNode } from "react";

export type CollectionType = "projectiles" | "invaders" | "buildings" | "cells";

export type Difficulty = "ROOKIE" | "CASUAL" | "MASTER" | "VETERAN" | "INSANE";

export class BoardState {
    public frame: number = 0;
    public collections: { projectiles: Projectile[], invaders: Invader[], buildings: Building[], cells: Cell[][] } = { projectiles: [], invaders: [], buildings: [], cells: [] };
    public energy: number;
    public score: number = 0;
    public gameOver: boolean = false;
    public gameWon: boolean = false;
    public messages: string[] = [];
    public path: PositionInterface[];
    private invaderQueue: InvaderType[] = [];
    private invaderPeriod: number = 0;

    constructor(public cellSize: number, difficulty: Difficulty) {
        const { rows, columns, turnFactor } = difficultyVariables[difficulty];
        this.invaderQueue = generateInvaderQueue(difficulty);
        this.invaderPeriod = difficultyVariables[difficulty]["invader-period"];
        this.energy = difficultyVariables[difficulty]["energy"];

        const { matrix, path } = generateGrid(rows, columns, turnFactor);
        this.collections.cells = matrixToCells(matrix, this.cellSize);

        this.path = pathToPositions(path, this.cellSize);

        const { row_index: base_row_index, column_index: base_column_index } = path[path.length - 1];
        this.addPathOccupier(base_row_index, base_column_index, "BASE");

        if (base_row_index > 0)
            this.addSlotOccupier(base_row_index - 1, base_column_index, "LASER");
        else
            this.addSlotOccupier(base_row_index + 1, base_column_index, "LASER");

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
            this.collections.projectiles = [];
            return this;
        }
        this.spawnInvaders();
        this.updateCollections();
        return this;
    }

    components({ setBuilding, demolishBuilding }: { setBuilding: (row_index: number, col_index: number) => void, demolishBuilding: (building: Building) => void }): JSX.Element[] {
        return [
            ...this.collections.cells.map((row: Cell[]) => row.map((cell: Cell) => cell.component({ setBuilding }))).flat(),
            ...this.collections.buildings.map((building: Building) => building.component({ demolishBuilding, children: {} as ReactNode })),
            ...this.collections.invaders.map((invader: Invader) => invader.component()),
            ...this.collections.projectiles.map((projectile: Projectile) => projectile.component()),
        ];
    }

    addMessage(message: string): void {
        if (this.messages.length > 5)
            this.messages.shift();
        this.messages.push(message);
    }

    addOccupier(row_index: number, column_index: number, type: BuildingType | WeaponType) {
        if (BuildingTypes.includes(type as BuildingType))
            this.addPathOccupier(row_index, column_index, type as InstallationType);
        else if (WeaponTypes.includes(type as WeaponType))
            this.addSlotOccupier(row_index, column_index, type as WeaponType);
        return this;
    }

    removeOccupier(building: Building) {
        building.dismantle(this);
        return this;
    }

    private addSlotOccupier(row_index: number, column_index: number, type: WeaponType): void {
        const template = defenses[type];
        if (!this.checkCost(template as BuildingTemplate))
            return;
        if (row_index < 0 || row_index >= this.collections.cells.length || column_index < 0 || column_index >= this.collections.cells[0].length)
            return;
        const cell = this.collections.cells[row_index][column_index] as SlotCell;

        let defense: Defense;
        if (type === "SNIPER")
            defense = new VectorTurret(row_index, column_index, template as VectorDefenseTemplate, this.cellSize);
        else
            defense = new ScalarTurret(row_index, column_index, template as DefenseTemplate, this.cellSize);

        if (cell.occupy(defense)) {
            this.addBuilding(defense);
        }
    }

    private addPathOccupier(row_index: number, column_index: number, type: Exclude<BuildingType, "DEFENSE">): void {
        const template = buildings[type];
        if (!this.checkCost(template as BuildingTemplate))
            return;
        const cell = this.collections.cells[row_index][column_index] as PathCell;
        let installation;
        if (template.type === "GENERATOR")
            installation = new Generator(row_index, column_index, template as GeneratorTemplate, this.cellSize);
        else if (template.type === "BARRICADE")
            installation = new Barricade(row_index, column_index, template as BarricadeTemplate, this.cellSize);
        else if (template.type === "BASE")
            installation = new Base(row_index, column_index, template as BaseTemplate, this.cellSize);
        else if (template.type === "EXPLOSIVE")
            installation = new Explosive(row_index, column_index, template as ExplosiveTemplate, this.cellSize);
        else
            return;

        if (cell.occupy(installation))
            this.addBuilding(installation);
    }

    private addBuilding(building: Building) {
        this.energy -= building.cost;
        building.addSelf(this);
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

    private updateCollections() {
        this.collections.projectiles.forEach((projectile: Projectile) => projectile.update(this));
        this.collections.invaders.forEach((invader: Invader) => invader.update(this));
        this.collections.buildings.forEach((building: Building) => building.update(this));
    }
}