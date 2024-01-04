import { Explosive } from "./buildings/explosive";
import { Defense, VectorTurret } from "./buildings/defenses";
import { AlignmentType, PositionInterface, ScalarInterface, VectorInterface } from "./unit";

export function collision(unitA: ScalarInterface, unitB: ScalarInterface) {
    if (unitA.x === -1 || unitB.x === -1) return false;
    if (unitA.x + unitA.width < unitB.x + 1 || unitB.x + unitB.width < unitA.x + 1 || unitA.y + unitA.height < unitB.y + 1 || unitB.y + unitB.height < unitA.y + 1)
        return false;
    else
        return true;
};


export function distance(defense: ScalarInterface, invader: ScalarInterface) {
    if (!defense?.x || !invader?.x) return 0;
    return Math.sqrt(Math.pow(defense.x - invader.x, 2) + Math.pow(defense.y - invader.y, 2));
};

export function getAngle(defense: ScalarInterface, invader: ScalarInterface) {
    if (!defense?.x || !invader?.x) return 0;
    return Math.atan2(invader.y - defense.y, invader.x - defense.x);
};

export function angleToAlignment(defense: VectorInterface, invader: ScalarInterface, alignment: AlignmentType) {
    if (!defense?.x || !invader?.x) return 0;
    let angle = Math.atan2(invader.y - defense.y, invader.x - defense.x);
    switch (alignment) {
        case "NORTH":
            return Math.abs(angle - Math.PI / 2);
        case "SOUTH":
            return Math.abs(angle + Math.PI / 2);
        case "EAST":
            return Math.abs(angle);
        case "WEST":
            return Math.min(Math.abs(angle + Math.PI), Math.abs(angle - Math.PI));
        default:
            return 0;
    }
}

export function radiansToDegrees(radians: number) {
    return radians * 180 / Math.PI;
}

export function isInRadius(bomb: Explosive, invader: ScalarInterface) {
    return distance(bomb, invader) <= bomb.template.radius;
};

export function isInRange(defense: Defense, invader: ScalarInterface) {
    return distance(defense, invader) <= defense.template.range;
};

export function isInScope(defense: VectorTurret, invader: ScalarInterface) {
    let angle = angleToAlignment(defense, invader, defense.alignment);
    return distance(defense, invader) <= defense.template.range && Math.abs(angle) <= defense.template.scope;
};

export function pathToPositions(path: { column_index: number; row_index: number; }[], cellSize: number): PositionInterface[] {
    return path.map((position) => ({
        x: position.column_index * cellSize,
        y: position.row_index * cellSize,
    }));
}
