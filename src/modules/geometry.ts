import { Explosive } from "./building";
import { Turret, VectorTurret } from "./turret";
import { AlignmentType, StateInterface, VectorStateInterface } from "./unit";

export function collision(defense: StateInterface, invader: StateInterface) {
    if (defense.x + defense.width < invader.x + 1 || invader.x + invader.width < defense.x + 1 || defense.y + defense.height < invader.y + 1 || invader.y + invader.height < defense.y + 1)
        return false;
    else
        return true;
};


export function distance(defense: StateInterface, invader: StateInterface) {
    if (!defense?.x || !invader?.x) return 0;
    return Math.sqrt(Math.pow(defense.x - invader.x, 2) + Math.pow(defense.y - invader.y, 2));
};

export function getAngle(defense: StateInterface, invader: StateInterface) {
    if (!defense?.x || !invader?.x) return 0;
    return Math.atan2(invader.y - defense.y, invader.x - defense.x);
};

export function angleToAlignment(defense: VectorStateInterface, invader: StateInterface, alignment: AlignmentType) {
    if (!defense?.x || !invader?.x) return 0;
    let angle = Math.atan2(invader.y - defense.y, invader.x - defense.x);
    switch (alignment) {
        case "NORTH":
            return angle;
        case "SOUTH":
            return angle + Math.PI;
        case "EAST":
            return angle + Math.PI / 2;
        case "WEST":
            return angle - Math.PI / 2;
        default:
            return 0;
    }
}

export function isInRadius(bomb: Explosive, invader: StateInterface) {
    return distance(bomb, invader) <= bomb.radius;
};

export function isInRange(defense: Turret, invader: StateInterface) {
    return distance(defense, invader) <= defense.range;
};

export function isInScope(defense: VectorTurret, invader: StateInterface) {
    let angle = angleToAlignment(defense, invader, defense.alignment);
    return distance(defense, invader) <= defense.range && Math.abs(angle - defense.angle) <= defense.scope;
};