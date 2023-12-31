import { state } from "../utilities/state";


export function collision(first: state, second: state) {
    if (!first?.x || !second?.x) return false;
    if (first.x + first.width < second.x + 1 || second.x + second.width < first.x + 1 || first.y + first.height < second.y + 1 || second.y + second.height < first.y + 1)
        return false;
    else
        return true;
}
