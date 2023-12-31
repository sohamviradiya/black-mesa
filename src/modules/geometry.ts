import { AlignmentType } from "./turret";
import { StateInterface } from "./unit";

export function collision(first: StateInterface, second: StateInterface) {
    if (!first?.x || !second?.x) return false;
    if (first.x + first.width < second.x + 1 || second.x + second.width < first.x + 1 || first.y + first.height < second.y + 1 || second.y + second.height < first.y + 1)
        return false;
    else
        return true;
};

export function distance(first: StateInterface, second: StateInterface) {
    if (!first?.x || !second?.x) return 0;
    return Math.sqrt(Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2));
};

export function angle(first: StateInterface, second: StateInterface) {
    if (!first?.x || !second?.x) return 0;
    return Math.atan2(second.y - first.y, second.x - first.x);
};

export function angleToAlignment(first: StateInterface, second: StateInterface, alignment: AlignmentType) {
    if (!first?.x || !second?.x) return 0;
    let angle = Math.atan2(second.y - first.y, second.x - first.x);
    switch (alignment) {
        case "NORTH":
            return angle;
        case "SOUTH":
            return angle + Math.PI;
        case "EAST":
            return angle + Math.PI / 2;
        case "WEST":
            return angle - Math.PI / 2;
    }
}