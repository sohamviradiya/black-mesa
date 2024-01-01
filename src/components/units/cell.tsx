import { Box } from "@mui/material";
import { Cell, CellType } from "../../modules/cell";

export default function CellComponent({ cell }: { cell: Cell }) {
    return <Box sx={{ minWidth: "40px", minHeight: "40px", backgroundColor: getCellColor(cell.type), border: "1px solid black" }} />;
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
};