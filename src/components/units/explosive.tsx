import { Box } from "@mui/material";
import { Explosive } from "../../modules/buildings/explosive";

export default function ExplosiveComponent({ explosive }: { explosive: Explosive }) {
    return <Box sx={{ width: explosive.width, height: explosive.height, backgroundColor: "orange", border: "1px solid black" }} />;
};