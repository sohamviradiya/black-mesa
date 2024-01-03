import { Box, Typography } from "@mui/material";
import { Building } from "../../modules/building";

export default function BuildingComponent({ building, children }: { building: Building, children: React.ReactNode }) {
    return <Box sx={{ height: "80%", width: "80%", border: "1px solid black", backgroundColor: "blueviolet" }}>
        {children}
        <Typography sx={{ textAlign: "center" }} variant="h6">{building.type}</Typography>
    </Box>
};
