import { Box, Typography } from "@mui/material";
import { Building } from "../../modules/building";

export default function BuildingComponent({ building, children }: { building: Building, children: React.ReactNode }) {
    return <Box sx={{
        height: "100%",
        width: "80%",
        border: "1px solid black",
        backgroundColor: "blueviolet",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }}>
        {children}
        <Typography sx={{ textAlign: "center" }} variant="body2">{building.type}</Typography>
    </Box>
};
