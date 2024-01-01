import { Box } from "@mui/material";
import { VectorTurret } from "../../modules/defenses";

export default function VectorTurretComponent({ turret }: { turret: VectorTurret }) {
    return <Box sx={{ minWidth: "40px", minHeight: "40px", backgroundColor: "darkcyan", border: "1px solid black" }} />;
};

