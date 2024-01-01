import { Box } from "@mui/material";
import { ScalarTurret } from "../../modules/defenses";

export default function ScalarTurretComponent({ turret }: { turret: ScalarTurret }) {
    return <Box sx={{ minWidth: "40px", minHeight: "40px", backgroundColor: "dodgerblue", border: "1px solid black" }} />;
};

