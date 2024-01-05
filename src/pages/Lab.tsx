import { useEffect, useState } from "react";
import { BoardState } from "../modules/state";
import { Box, Container, MenuItem, Select, Typography } from "@mui/material";
import MessageComponent from "../components/message";
import { WeaponType } from "../modules/buildings/defenses";
import { BuildingType } from "../modules/building";

const newState = new BoardState(1000, "ROOKIE");

type ItemsType = "NO_ITEM" | WeaponType | BuildingType;

export default function Lab() {
    const [, setTick] = useState(0);
    const [boardState, setBoardState] = useState<BoardState>(newState);
    const [{ x, y }, setMousePosition] = useState({ x: 0, y: 0 });
    const [item, setItem] = useState<ItemsType>("NO_ITEM");

    const setBuilding = (row_index: number, col_index: number) => {
        if (item !== "NO_ITEM") {
            setBoardState((prevBoardState: BoardState) => prevBoardState.addOccupier(row_index, col_index, item));
        }
    };

    const demolishBuilding = (row_index: number, col_index: number) => {
        setBoardState((prevBoardState: BoardState) => prevBoardState.removeOccupier(row_index, col_index));
    };

    useEffect(() => {
        let animationFrameId: number;

        const gameLoop = () => {
            setBoardState((prevBoardState: BoardState) => prevBoardState.update({ x, y }));
            setTick((prevTick) => prevTick + 1);
            animationFrameId = requestAnimationFrame(gameLoop);
        };

        animationFrameId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [x, y]);

    return (
        <Container maxWidth="xl" sx={{ height: "100vh", width: "100vw", backgroundColor: "whitesmoke", display: "flex", flexDirection: "column", gap: "10rem" }}>
            <Box sx={{ position: "relative", height: boardState.cellSize * boardState.collections.cells.length }} onMouseMove={(e) => { setMousePosition({ x: e.nativeEvent.x - e.currentTarget.offsetLeft, y: e.nativeEvent.y - e.currentTarget.offsetTop }); }} onMouseLeave={(e) => { setMousePosition({ x: -1, y: -1 }) }}>
                {boardState.components({ setBuilding, demolishBuilding })}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
                {boardState.messages.map((message, index) => (
                    <Box key={index} sx={{ padding: "1rem" }} >
                        <MessageComponent message={message} />
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Typography variant="h6">Energy: {boardState.energy}</Typography>
                <Select defaultValue="NO_ITEM" onChange={(e) => { setItem(e.target.value as ItemsType) }} value={item} sx={{ width: "50%" }}>
                    <MenuItem value="NO_ITEM">No Item</MenuItem>
                    <MenuItem value="EXPLOSIVE">Explosive 💣</MenuItem>
                    <MenuItem value="BARRICADE">Barricade 🚧</MenuItem>
                    <MenuItem value="GENERATOR">Generator ⚡</MenuItem>
                    <MenuItem value="LASER">Laser 🔫</MenuItem>
                    <MenuItem value="SNIPER">Sniper 🎯</MenuItem>
                    <MenuItem value="MISSILE_LAUNCHER">Missile Launcher 🚀</MenuItem>
                    <MenuItem value="MACHINE_GUN">Machine Gun 🎆</MenuItem>
                    <MenuItem value="SHOTGUN">Shotgun 🎇</MenuItem>
                </Select>
            </Box>
        </Container>
    );
}
