import { useEffect, useState } from "react";
import { BoardState } from "../modules/state";
import { Box, Container } from "@mui/material";
import MessageComponent from "../components/message";

const newState = new BoardState(1000, "ROOKIE");

export default function Lab() {
    const [tick, setTick] = useState(0);
    const [boardState, setBoardState] = useState<BoardState>(newState);

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
        <Container maxWidth="xl" sx={{ height: "100vh", width: "100vw", backgroundColor: "whitesmoke", padding: "2rem", display: "flex", flexDirection: "column", gap: "5rem" }}>
            <Box sx={{ position: "relative" }} >
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
