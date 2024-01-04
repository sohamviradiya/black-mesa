import { useEffect, useRef, useState } from "react";
import { BoardState } from "../modules/state";
import { Box, Container } from "@mui/material";
import MessageComponent from "../components/message";

const newState = new BoardState(1000, "ROOKIE");

export default function Lab() {
    const [tick, setTick] = useState(0);
    const [boardState, setBoardState] = useState<BoardState>(newState);
    const [{ x, y }, setMousePosition] = useState({ x: 0, y: 0 });

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
        <Container maxWidth="xl" sx={{ height: "100vh", width: "100vw", backgroundColor: "whitesmoke", display: "flex", flexDirection: "column", gap: "5rem" }}>
            <Box sx={{ position: "relative", height: boardState.cellSize * 10, backgroundColor: "red" }} onMouseMove={(e) => { setMousePosition({ x: e.nativeEvent.x - e.currentTarget.offsetLeft, y: e.nativeEvent.y - e.currentTarget.offsetTop }); }} onMouseLeave={(e) => { setMousePosition({ x: -1, y: -1 }) }}>
                {boardState.components()}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
                {boardState.messages.map((message, index) => (
                    <Box key={index} sx={{ padding: "1rem" }} >
                        <MessageComponent message={message} />
                    </Box>
                ))}
            </Box>
        </Container>
    );
}
