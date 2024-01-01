import { Explosive } from "./explosive";
import { Defense, VectorTurret } from "./defenses";
import { AlignmentType, ScalarInterface, VectorInterface } from "./unit";

export function collision(defense: ScalarInterface, invader: ScalarInterface) {
    if (defense.x + defense.width < invader.x + 1 || invader.x + invader.width < defense.x + 1 || defense.y + defense.height < invader.y + 1 || invader.y + invader.height < defense.y + 1)
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

export function isInRadius(bomb: Explosive, invader: ScalarInterface) {
    return distance(bomb, invader) <= bomb.template.radius;
};

export function isInRange(defense: Defense, invader: ScalarInterface) {
    return distance(defense, invader) <= defense.template.range;
};

export function isInScope(defense: VectorTurret, invader: ScalarInterface) {
    let angle = angleToAlignment(defense, invader, defense.alignment);
    return distance(defense, invader) <= defense.template.range && Math.abs(angle - defense.angle) <= defense.template.scope;
};