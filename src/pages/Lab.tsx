import { useEffect, useState } from "react";
import { BoardState } from "../modules/state";
import { Container, Typography } from "@mui/material";

export default function Lab() {
    const [tick, setTick] = useState(0);
    const [boardState, setBoardState] = useState<BoardState>(new BoardState(1000, "ROOKIE"));

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
        <Container maxWidth="xl" sx={{ height: "100vh", width: "100vw", backgroundColor: "whitesmoke", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h6" sx={{ position: "absolute", top: 0, left: 0, margin: 2 }}>
                {boardState.frame}
            </Typography>

            {boardState.components()}
        </Container>
    );
}
