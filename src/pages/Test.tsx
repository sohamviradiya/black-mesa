import { Box, Container, Slider, Typography } from "@mui/material"
import { useMemo, useState } from "react";
import { generateMatrix } from "../modules/grid";
import { CellType } from "../modules/cell";


export default function Test() {
    const [rows, setRows] = useState<number>(4);
    const [cols, setCols] = useState<number>(4);
    const [turnFactor, setTurnFactor] = useState<number>(0);
    const matrix = useMemo(() => {
        return generateMatrix(rows, cols, turnFactor);
    }, [rows, cols, turnFactor]);

    return (
        <Container maxWidth="xl" sx={{ background: "whitesmoke", textAlign: "center", padding: "3rem" }}>
            <Box sx={{ width: "100%" }}>
                <Typography variant="h1">Test</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Typography variant="h3">Rows</Typography>
                <Slider min={4} max={25} step={1} value={rows} onChange={(e, v) => setRows(v as number)} />
                <Slider min={4} max={25} step={1} value={cols} onChange={(e, v) => setCols(v as number)} />
                <Slider min={0} max={1} step={0.01} value={turnFactor} onChange={(e, v) => setTurnFactor(v as number)} />
            </Box>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {matrix.map((row, i) => (
                    <Box key={i} sx={{ display: "flex", flexDirection: "row" }}>
                        {row.map((cell, j) => (
                            <Box key={j} sx={{ width: "50px", height: "50px", background: getCellColor(cell), border: "1px solid black" }} />
                        ))}
                    </Box>
                ))}
            </Box>
        </Container>
    )
};

function getCellColor(type: CellType): string {
    switch (type) {
        case "EMPTY":
            return "white";
        case "PATH":
            return "green";
        case "SLOT":
            return "blue";
        case "WALL":
            return "black";
    }
}