import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useMemo, useState } from "react";
import { BoardState, Difficulty } from "../modules/state";
import MessageComponent from "../components/message";

export default function Test() {
    const [difficulty, setDifficulty] = useState<Difficulty>("ROOKIE");
    const [finalDifficulty, setFinalDifficulty] = useState<Difficulty | "NOT-SET">("NOT-SET");
    const state = useMemo(() => {
        return new BoardState(1200, difficulty);
    }, [difficulty]);


    return (
        <Box sx={{ backgroundColor: "whitesmoke", textAlign: "center", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: "100%", textOverflow: "clip", wordBreak: "break-all" }}>
                <Typography variant="h1">Test</Typography>
                <Typography variant="h3">Dimensions</Typography>
            </Box>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel>Difficulty</InputLabel>
                        <Select
                            value={difficulty}
                            label="Difficulty"
                            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                            disabled={finalDifficulty !== "NOT-SET"}
                        >
                            <MenuItem value={"ROOKIE"} selected>Rookie</MenuItem>
                            <MenuItem value={"CASUAL"}>Casual</MenuItem>
                            <MenuItem value={"MASTER"}>Master</MenuItem>
                            <MenuItem value={"VETERAN"}>Veteran</MenuItem>
                            <MenuItem value={"INSANE"}>Insane</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="outlined" onClick={() => setFinalDifficulty(difficulty)} disabled={finalDifficulty !== "NOT-SET"}>Set</Button>
            </Box>
            {<>
                <Typography variant="h3">{finalDifficulty}</Typography>
                <Box sx={{ position: "relative", width: state.cellSize * (state.collections.cells[0].length + 2), height: state.cellSize * (state.collections.cells.length + 2) }}>
                    {state.components()}
                </Box>
                {state.messages.map((message) => <MessageComponent message={message} />)}
            </>}
        </Box>
    )
};
