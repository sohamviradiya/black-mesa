import { Box } from "@mui/material";
import { VectorTurret } from "../../modules/buildings/defenses";

export default function VectorTurretComponent({ turret }: { turret: VectorTurret }) {
    return <Box sx={{ width: turret.width,  height: turret.height, backgroundColor: "darkcyan", border: "1px solid black", transform: `rotate(${turret.angle}rad)` }} />;
};

