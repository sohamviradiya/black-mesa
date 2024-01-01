import { Box, Container, Slider, Typography } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react";
import { generateMatrix } from "../modules/grid";
import { CellType } from "../modules/cell";
import { ScalarTurret } from "../modules/defenses";
import TurretComponent from "../components/turret";
import { Invader } from "../modules/invader";
import InvaderComponent from "../components/invader";
import CellComponent from "../components/units/cell";
import { Cell } from "../modules/cell";
import { cellSize } from "../utilities/constants";


export default function Test() {
    const [rows, setRows] = useState<number>(4);
    const [cols, setCols] = useState<number>(4);
    const [turnFactor, setTurnFactor] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);

    const { matrix, turret, invader } = useMemo(() => {
        return {
            matrix: generateMatrix(rows, cols, turnFactor),
            turret: new ScalarTurret(20, 20, 20, 100, 1, 1, { width: 100, height: 100, speed: 100, damage: 10 }),
            invader: new Invader(100, 100, 30, 30, [], 1, 100, 100, 20, 100)
        };
    }, [rows, cols, turnFactor]);


    return (
        <Container sx={{ backgroundColor: "whitesmoke", textAlign: "center", padding: "3rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: "100%", textOverflow: "clip", wordBreak: "break-all" }}>
                <Typography variant="h1">Test</Typography>
                <Typography variant="h3">Dimensions</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Typography variant="h3">Rows</Typography>
                <Slider min={4} max={25} step={1} value={rows} onChange={(e, v) => setRows(v as number)} />
                <Slider min={4} max={25} step={1} value={cols} onChange={(e, v) => setCols(v as number)} />
                <Slider min={0} max={1} step={0.01} value={turnFactor} onChange={(e, v) => setTurnFactor(v as number)} />
            </Box>
            <Box sx={{ position: "relative" }}>
                {matrix.map((row, i) => (
                    <Box key={i} sx={{ display: "flex", flexDirection: "row", zIndex: 0 }}>
                        {row.map((type, j) => (
                            <CellComponent key={j} cell={new Cell(translateCellIndexToPosition(i, j, 40).x, translateCellIndexToPosition(i, j, 40).y, cellSize, type as CellType)} />
                        ))}
                    </Box>
                ))}
                {turret && <TurretComponent turret={turret} />}
                {invader && <InvaderComponent invader={invader} />}
            </Box>
        </Container>
    )
};

function translateCellIndexToPosition(row: number, col: number, size: number) {
    return {
        x: col * size,
        y: row * size
    }
}
