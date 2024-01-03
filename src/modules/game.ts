import { BoardState } from "./state";

export function gameLoop(setBoardState: React.Dispatch<React.SetStateAction<BoardState>>)  {
    setBoardState((state: BoardState) => state.update());
    requestAnimationFrame(() => gameLoop(setBoardState));
}