import { Box,  FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useMemo, useState } from "react";
import { generateGrid } from "../modules/grid";
import { CellType } from "../modules/cell";
import CellComponent from "../components/units/cell";
import { Cell } from "../modules/cell";
import { Difficulty, difficultyMapper } from "../modules/game-setter";


export default function Test() {
    const [difficulty, setDifficulty] = useState<Difficulty>("ROOKIE");

    const { matrix, cellSize } = useMemo(() => {
        const { rows, columns, turnFactor } = difficultyMapper(difficulty);

        return {
            cellSize: 1200/columns,
            matrix: generateGrid(rows, columns, turnFactor).matrix,
        };
    }, [difficulty]);


    return (
        <Box sx={{ backgroundColor: "whitesmoke", textAlign: "center", padding: "3rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: "100%", textOverflow: "clip", wordBreak: "break-all" }}>
                <Typography variant="h1">Test</Typography>
                <Typography variant="h3">Dimensions</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Difficulty</InputLabel>
                    <Select
                        value={difficulty}
                        label="Difficulty"
                        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    >
                        <MenuItem value={"ROOKIE"} selected>Rookie</MenuItem>
                        <MenuItem value={"CASUAL"}>Casual</MenuItem>
                        <MenuItem value={"MASTER"}>Master</MenuItem>
                        <MenuItem value={"VETERAN"}>Veteran</MenuItem>
                        <MenuItem value={"INSANE"}>Insane</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ position: "relative", width: matrix[0].length * cellSize + 20, height: matrix.length * cellSize + 20 }}>
                {matrix.map((row, i) => (
                    <Box key={i} sx={{ display: "flex", flexDirection: "row", zIndex: 0 }}>
                        {row.map((type, j) => (
                            <CellComponent key={j} cell={new Cell(i, j, cellSize, type as CellType)} />
                        ))}
                    </Box>
                ))}
                {/* {turret && <TurretComponent turret={turret} />}
                {invader && <InvaderComponent invader={invader} />} */}
            </Box>
        </Box>
    )
};
