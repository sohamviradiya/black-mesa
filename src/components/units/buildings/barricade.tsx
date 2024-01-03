import { Box } from "@mui/material";
import { Barricade } from "../../../modules/buildings/barricade";

export default function BarricadeComponent({ barricade }: { barricade: Barricade }) {
    return <Box sx={{ width: "100%", height: "100%", backgroundColor: "bisque", border: "1px solid black" }} />;
};

