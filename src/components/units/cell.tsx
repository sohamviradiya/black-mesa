import { Box } from "@mui/material";
import { Cell, CellType } from "../../modules/cell";

export default function CellComponent({ cell }: { cell: Cell }) {
    return <Box sx={{ width: cell.width, height: cell.height, backgroundColor: getCellColor(cell.type), border: "1px solid black", position: "absolute", top: cell.y, left: cell.x }} onClick={(e) => {
        e.currentTarget.style.backgroundColor = getCellColor("WALL");
        setTimeout(() => {
            e.currentTarget.style.backgroundColor = getCellColor(cell.type);
        }, 1000);
    }} />
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