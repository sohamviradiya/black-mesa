import { Box, Typography } from "@mui/material";
import { VectorTurret } from "../../../../modules/buildings/defenses";

export default function VectorTurretComponent({ turret }: { turret: VectorTurret }) {
    return <Box sx={{ border: "1px solid black", width: "100%", height: "20%" }} onClick={() => turret.setAlignment()}>
        <Typography>{turret.alignment}</Typography>
    </Box>;
};

