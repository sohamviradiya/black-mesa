import { Explosive } from "./buildings/explosive";
import { Defense, VectorTurret } from "./buildings/defenses";
import { AlignmentType, PositionInterface, ScalarInterface, VectorInterface } from "./unit";

export function collision(unitA: ScalarInterface, unitB: ScalarInterface) {
    if (unitA.x + unitA.width <= unitB.x || unitB.x + unitB.width <= unitA.x || unitA.y + unitA.height <= unitB.y || unitB.y + unitB.height <= unitA.y)
        return false;
    else
        return true;
};


export function distance(defense: ScalarInterface, invader: ScalarInterface) {
    return Math.sqrt(Math.pow(defense.x - invader.x, 2) + Math.pow(defense.y - invader.y, 2));
};

export function getAngle(defense: ScalarInterface, invader: ScalarInterface) {
    return Math.atan2(invader.y - defense.y, invader.x - defense.x);
};

export function angleToAlignment(defense: VectorInterface, invader: ScalarInterface, alignment: AlignmentType) {
    let angle = Math.atan2(invader.y - defense.y, invader.x - defense.x);
    if (alignment === "NORTH")
        angle += Math.PI / 2;
    else if (alignment === "WEST")
        angle -= Math.PI;
    else if (alignment === "SOUTH")
        angle -= Math.PI / 2;
    return Math.min(Math.abs(angle), Math.abs(angle - 2 * Math.PI), Math.abs(angle + 2 * Math.PI));
}

export function radiansToDegrees(radians: number) {
    return radians * 180 / Math.PI;
}

export function isInRadius(bomb: Explosive, invader: ScalarInterface) {
    return distance(bomb, invader) <= bomb.radius;
};

export function isInRange(defense: Defense, invader: ScalarInterface) {
    return distance(defense, invader) <= defense.range;
};

export function isInScope(defense: VectorTurret, invader: ScalarInterface) {
    let angle = angleToAlignment(defense, invader, defense.alignment);
    return isInRange(defense, invader) && Math.abs(angle) <= defense.template.scope;
};

export function pathToPositions(path: { column_index: number; row_index: number; }[], cellSize: number): PositionInterface[] {
    return path.map((position) => ({
        x: position.column_index * cellSize + cellSize / 2,
        y: position.row_index * cellSize + cellSize / 2,
    }));
}
