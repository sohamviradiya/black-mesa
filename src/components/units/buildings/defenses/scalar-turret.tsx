import { Box } from "@mui/material";
import { ScalarTurret } from "../../../../modules/buildings/defenses";

export default function ScalarTurretComponent({ turret }: { turret: ScalarTurret }) {
    return <Box  sx={{ backgroundColor: "dodgerblue", border: "1px solid black" }} />;
};

