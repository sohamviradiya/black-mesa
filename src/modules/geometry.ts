import { StateInterface } from "./unit";

export function collision(defense: StateInterface, invader: StateInterface) {
    if (!defense?.x || !invader?.x) return false;
    if (defense.x + defense.width < invader.x + 1 || invader.x + invader.width < defense.x + 1 || defense.y + defense.height < invader.y + 1 || invader.y + invader.height < defense.y + 1)
        return false;
    else
        return true;
};

export function distance(defense: StateInterface, invader: StateInterface) {
    if (!defense?.x || !invader?.x) return 0;
    return Math.sqrt(Math.pow(defense.x - invader.x, 2) + Math.pow(defense.y - invader.y, 2));
};

export function angle(defense: StateInterface, invader: StateInterface) {
    if (!defense?.x || !invader?.x) return 0;
    return Math.atan2(invader.y - defense.y, invader.x - defense.x);
};

export function angleToAlignment(defense: StateInterface, invader: StateInterface) {
    if (!defense?.x || !invader?.x) return 0;
    let angle = Math.atan2(invader.y - defense.y, invader.x - defense.x);
    switch (defense.alignment) {
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