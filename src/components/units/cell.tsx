import { Box } from "@mui/material";
import { Cell, CellType, OccupiableCell } from "../../modules/cell";

export default function CellComponent({ cell, setBuilding }: { cell: Cell, setBuilding: (row_index: number, col_index: number) => void }) {
    return <Box key={cell.id} sx={{
        width: cell.width,
        height: cell.height,
        border: "1px solid black",
        position: "absolute",
        top: cell.y,
        left: cell.x,
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        zIndex: 0,
        fontSize: 0.5 * cell.height,
        backgroundColor: getCellColor(cell.type),
    }}
        onClick={() => {
            if (!(cell as OccupiableCell)?.occupier)
                setBuilding(cell.row_index, cell.column_index);
        }}
    />
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