import { Projectile } from "../../modules/projectile";

export default function ProjectileComponent({ projectile }: { projectile: Projectile }) {
    return <div style={{ height: "100%", width: "100%" }} >
        <img src={getProjectileImage(projectile)} alt="projectile" style={{ width: projectile.width, height: projectile.height }} />
    </div>
};

function getProjectileImage(projectile: Projectile) {
    switch (projectile.template.name) {
        case "SNIPER":
            return "/images/sniper-bullet.svg"
        case "MACHINE_GUN":
            return "/images/machine-gun-bullet.svg"
        case "MISSILE_LAUNCHER":
            return "/images/missile.svg"
        case "FLAME_THROWER":
            return "/images/flame-thrower-bullet.svg"
        case "LASER":
            return "/images/laser-bullet.svg"
    }
}