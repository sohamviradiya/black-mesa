import { Box } from "@mui/material";
import { Projectile } from "../../modules/projectiles";
import { radiansToDegrees } from "../../modules/geometry";

export default function ProjectileComponent({ projectile }: { projectile: Projectile }) {
    const angle = radiansToDegrees(projectile.angle);

    return <Box sx={{ width: projectile.width, height: projectile.height, backgroundColor: "grey", border: "1px solid black", zIndex: 2, transform: `rotate(${angle}deg)` }} />;
};

