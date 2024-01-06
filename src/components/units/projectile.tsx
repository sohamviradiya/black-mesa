import { Box } from "@mui/material";
import { Projectile } from "../../modules/projectile";
import sniperBulletImage from "../../assets/images/sniper-bullet.svg";
import machineGunBulletImage from "../../assets/images/machine-gun-bullet.svg";
import missileImage from "../../assets/images/missile.svg";
import shotgunBulletImage from "../../assets/images/shot-gun-bullet.svg";
import laserBulletImage from "../../assets/images/laser-bullet.svg";

export default function ProjectileComponent({ projectile }: { projectile: Projectile }) {
    return <Box sx={{ backgroundColor: "dimgrey", height: "100%", width: "100%" }} >
        <img src={getProjectileImage(projectile)} alt="projectile" style={{ width: projectile.width, height: projectile.height }} />
    </Box>
};

function getProjectileImage(projectile: Projectile) {
    switch (projectile.template.name) {
        case "SNIPER":
            return sniperBulletImage;
        case "MACHINE_GUN":
            return machineGunBulletImage;
        case "MISSILE_LAUNCHER":
            return missileImage;
        case "SHOTGUN":
            return shotgunBulletImage;
        case "LASER":
            return laserBulletImage;
    }
}