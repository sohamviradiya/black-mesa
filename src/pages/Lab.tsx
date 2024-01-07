import { useEffect, useMemo, useState } from "react";
import { BoardState } from "../modules/state";
import { WeaponType } from "../modules/buildings/defenses";
import { Building, BuildingType } from "../modules/building";
import { LabRoute } from "../Root";


type ItemsType = "NO_ITEM" | WeaponType | BuildingType;

export default function Lab() {
    const { difficulty } = LabRoute.useSearch();

    const newState = useMemo(() => {
        return new BoardState(50, difficulty);
    }, [difficulty]);

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
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "whitesmoke", height: "10vh", padding: "1rem" }}>
                <select onChange={(e) => { setItem(e.target.value as ItemsType) }} value={item} style={{ width: "40%", fontSize: "2rem" }}>
                    <option value="NO_ITEM">No Item</option>
                    <option value="EXPLOSIVE">Explosive - 150</option>
                    <option value="BARRICADE">Barricade - 100</option>
                    <option value="LASER">Laser - 100</option>
                    <option value="MACHINE_GUN">Machine Gun - 150</option>
                    <option value="FLAME_THROWER">FLAME_THROWER - 150</option>
                    <option value="SNIPER">Sniper - 200</option>
                    <option value="MISSILE_LAUNCHER">Missile Launcher - 200</option>
                    <option value="GENERATOR">Generator - 200</option>
                </select>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50%" }}>
                    <h1>Score: {boardState.score} 💲</h1>
                    <h1> Energy: {boardState.energy} ⚡</h1>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "80%", marginTop: "1rem" }}>
                <div style={{ position: "relative", backgroundColor: "whitesmoke", flex: "1" }}>
                    {boardState.components({ setBuilding, demolishBuilding })}
                </div>
                <div style={{ position: "absolute", bottom: "1rem", right: "1rem", textAlign: "right", maxWidth: "30%" }}>
                    {boardState.messages.map((message, index) => (
                        <div key={index}>
                            <p style={{ fontSize: "0.8rem" }}>{message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
