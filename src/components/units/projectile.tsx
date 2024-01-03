import { Box } from "@mui/material";
import { Projectile } from "../../modules/projectiles";

export default function ProjectileComponent({ projectile }: { projectile: Projectile }) {
    return <Box sx={{ width: projectile.width, height: projectile.height, backgroundColor: "grey", border: "1px solid black", zIndex: 2, transform: `rotate(${projectile.angle}rad)` }} />;
};

