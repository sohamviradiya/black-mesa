import { Box, Typography } from "@mui/material";
import { Defense, WeaponType } from "../../../modules/buildings/defenses";

export default function DefenseComponent({ defense, children }: { defense: Defense, children: React.ReactNode }) {
    return <Box sx={{ border: "2px solid red", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
        <Box sx={{ transform: `rotate(${defense.angle + Math.PI}rad)` }}>
            <Typography variant="h3" sx={{ textAlign: "center" }}> {getSymbol(defense.template.weapon)} </Typography>
            {children}
        </Box>
    </Box>;
};

function getSymbol(type: WeaponType) {
    switch (type) {
        case "LASER": return "🔫";
        case "SNIPER": return "🎯";
        case "MISSILE_LAUNCHER": return "🚀";
        case "MACHINE_GUN": return "🎆";
        case "SHOTGUN": return "🎇";
    }
}
