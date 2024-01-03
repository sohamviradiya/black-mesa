import { Box } from "@mui/material";
import { Barricade } from "../../modules/buildings/barricade";

export default function BarricadeComponent({ barricade }: { barricade: Barricade }) {
    return <Box sx={{ width: barricade.width, height: barricade.height, backgroundColor: "grey", border: "1px solid black" }} />;
};

