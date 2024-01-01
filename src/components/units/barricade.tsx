import { Box } from "@mui/material";
import { Barricade } from "../../modules/barricade";

export default function BarricadeComponent({ barricade }: { barricade: Barricade }) {
    return <Box sx={{ minWidth: "40px", minHeight: "40px", backgroundColor: "grey", border: "1px solid black" }} />;
};

