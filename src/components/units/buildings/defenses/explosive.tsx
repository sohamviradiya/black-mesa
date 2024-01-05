import { Box, Typography } from "@mui/material";
import { Explosive } from "../../../../modules/buildings/explosive";

export default function ExplosiveComponent({ explosive }: { explosive: Explosive }) {
    return <Box sx={{ border: "1px solid black" }}>
        <Typography variant="h6">{explosive.timer}</Typography>
    </Box>;
};