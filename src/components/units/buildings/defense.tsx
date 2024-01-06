import { Box, Typography } from "@mui/material";
import { Defense, WeaponType } from "../../../modules/buildings/defenses";
import missileImage from "../../../assets/images/missile-launcher.svg";
import laserImage from "../../../assets/images/laser.svg";
import machineGunImage from "../../../assets/images/machine-gun.svg";
import shotgunImage from "../../../assets/images/shot-gun.svg";
import sniperImage from "../../../assets/images/sniper.svg";

export default function DefenseComponent({ defense, children }: { defense: Defense, children: React.ReactNode }) {
    return (<Box sx={{ border: "2px solid red", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <img src={getSymbol(defense.template.projectileTemplate.name)} style={{ transform: `rotate(${defense.angle}rad)`, }} alt="defense" height={defense.height * 0.8} width={defense.width * 0.8} />
        {children}
    </Box>);
};

function getSymbol(type: WeaponType) {
    switch (type) {
        case "LASER": return laserImage;
        case "SNIPER": return sniperImage;
        case "MISSILE_LAUNCHER": return missileImage;
        case "MACHINE_GUN": return machineGunImage;
        case "SHOTGUN": return shotgunImage;
    }
}
