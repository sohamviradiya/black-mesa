import { Box, Typography } from "@mui/material";
import { VectorTurret } from "../../../../modules/buildings/defenses";

export default function VectorTurretComponent({ turret }: { turret: VectorTurret }) {
    return <Box sx={{ backgroundColor: "darkcyan", border: "1px solid black" }} onClick={() => turret.setAlignment()}>
        <Typography variant="h6" sx={{ textAlign: "center" }}> {turret.angle} </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}> {turret.alignment} </Typography>
    </Box>;
};

