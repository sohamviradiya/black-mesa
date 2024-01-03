import { Box } from "@mui/material";
import { VectorTurret } from "../../../../modules/buildings/defenses";

export default function VectorTurretComponent({ turret }: { turret: VectorTurret }) {
    return <Box sx={{ width: "100%", height: "100%", backgroundColor: "darkcyan", border: "1px solid black" }} />;
};

