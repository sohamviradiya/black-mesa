import { Box } from "@mui/material";
import { Projectile } from "../../modules/projectile";

export default function ProjectileComponent({ projectile }: { projectile: Projectile }) {
    return <Box sx={{ backgroundColor: "dimgrey", border: "1px solid black", height: "100%", width: "100%" }} />;
};

