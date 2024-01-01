import { Box } from "@mui/material";
import { Explosive } from "../../modules/defenses";

export default function ExplosiveComponent({ explosive }: { explosive: Explosive }) {
    return <Box sx={{ minWidth: "40px", minHeight: "40px", backgroundColor: "orange", border: "1px solid black" }} />;
};