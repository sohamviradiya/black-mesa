import { Defense, WeaponType } from "../../../modules/buildings/defenses";

export default function DefenseComponent({ defense, children }: { defense: Defense, children: React.ReactNode }) {
    return (<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", opacity: (0.3 + 0.7*(defense.ammo/defense.template.ammo)) }}>
        <img src={`${getSymbol(defense.template.projectileTemplate.name)}`} style={{ transform: `rotate(${defense.angle}rad)`, }} alt="defense" height={defense.height * 0.8} width={defense.width * 0.8} />
        {children}
        <div>{defense.ammo} 💥</div>
    </div>);
};

function getSymbol(type: WeaponType) {
    if (type === "MISSILE_LAUNCHER") return "/images/missile-launcher.svg"
    else if (type === "LASER") return "/images/laser.svg"
    else if (type === "MACHINE_GUN") return "/images/machine-gun.svg"
    else if (type === "FLAME_THROWER") return "/images/flame-thrower.svg"
    else if (type === "SNIPER") return "/images/sniper.svg"
}
