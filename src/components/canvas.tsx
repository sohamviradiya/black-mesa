import React, { useEffect, useRef } from "react";

import setupBoard from "../utilities/animations";
import { Container, Typography } from "@mui/material";

export default function Canvas() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        animate(ref);
    }, []);
    return (
        <Container maxWidth="lg" sx={{ background: "black", padding: "5rem", textAlign: "center" }}>
            <Typography variant="h2" sx={{ color: "yellow" }}> Canvas </Typography>
            <canvas id="canvas" ref={ref} width={1000} height={500} />
        </Container>
    );
};

function animate(ref: React.RefObject<HTMLCanvasElement>) {
    if (!ref.current) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    setupBoard(context, { width: 0.1, height: 0.1, x: 0, y: 0, });
}