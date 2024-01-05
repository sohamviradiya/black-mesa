import { Box, Typography } from "@mui/material";
import { Building } from "../../modules/building";

export default function BuildingComponent({ building, children }: { building: Building, children: React.ReactNode }) {
    if (building.type === "DEFENSE") return <>{children}</>;

    return <Box sx={{ border: "2px solid blue", width: "100%", height: "100%" }} >
        <Typography variant="h3" sx={{ textAlign: "center" }}> {getSymbol(building)} </Typography>
        {children}
    </Box>;
};

function getSymbol(building: Building) {
    switch (building.type) {
        case "BASE": return "🏛";
        case "DEFENSE": return "";
        case "GENERATOR": return "🔋";
        case "BARRICADE": return "🚧";
        case "EXPLOSIVE": return "💣";
    }
}
