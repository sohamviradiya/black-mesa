import { Box } from "@mui/material";
import { Projectile } from "../../modules/projectiles";

export default function ProjectileComponent({ projectile }: { projectile: Projectile }) {
    return <Box sx={{ minWidth: "40px", minHeight: "40px", backgroundColor: "grey", border: "1px solid black" }} />;
};

