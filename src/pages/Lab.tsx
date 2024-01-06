import { useEffect, useState } from "react";
import { BoardState } from "../modules/state";
import MessageComponent from "../components/message";
import { WeaponType } from "../modules/buildings/defenses";
import { Building, BuildingType } from "../modules/building";

const newState = new BoardState(40, "VETERAN");

type ItemsType = "NO_ITEM" | WeaponType | BuildingType;

export default function Lab() {
    const [, setTick] = useState(0);
    const [boardState, setBoardState] = useState<BoardState>(newState);
    const [item, setItem] = useState<ItemsType>("NO_ITEM");

    const setBuilding = (row_index: number, col_index: number) => {
        if (item !== "NO_ITEM") {
            setBoardState((prevBoardState: BoardState) => prevBoardState.addOccupier(row_index, col_index, item));
        }
    };

    const demolishBuilding = (building: Building) => {
        setBoardState((prevBoardState: BoardState) => prevBoardState.removeOccupier(building));
    };

    useEffect(() => {
        let animationFrameId: number;

        const gameLoop = () => {
            setBoardState((prevBoardState: BoardState) => prevBoardState.update());
            setTick((prevTick) => prevTick + 1);
            animationFrameId = requestAnimationFrame(gameLoop);
        };

        animationFrameId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ position: "relative", backgroundColor: "whitesmoke", height: 2 * boardState.cellSize * (boardState.collections.cells.length), width: 2 * boardState.cellSize * (boardState.collections.cells.length) }}>
                {boardState.components({ setBuilding, demolishBuilding })}
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {boardState.messages.map((message, index) => (
                    <div key={index} style={{ padding: "1rem" }} >
                        <MessageComponent message={message} />
                    </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3>Score: {boardState.score}</h3>
                    <h3>Energy: {boardState.energy}</h3>
                    <select defaultValue="NO_ITEM" onChange={(e) => { setItem(e.target.value as ItemsType) }} value={item} style={{ width: "100%" }}>
                        <option value="NO_ITEM">No Item</option>
                        <option value="EXPLOSIVE">Explosive 💣</option>
                        <option value="BARRICADE">Barricade 🚧</option>
                        <option value="GENERATOR">Generator ⚡</option>
                        <option value="LASER">Laser 🔫</option>
                        <option value="SNIPER">Sniper 🎯</option>
                        <option value="MISSILE_LAUNCHER">Missile Launcher 🚀</option>
                        <option value="MACHINE_GUN">Machine Gun 🎆</option>
                        <option value="SHOTGUN">Shotgun 🎇</option>
                    </select>
                </div>
            </div>
        </div >
    );
}
