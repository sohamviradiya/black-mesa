import { Box, Typography } from "@mui/material";
import { Installation } from "../../../modules/buildings/installation";

export default function InstallationComponent({ installation, children }: { installation: Installation, children: React.ReactNode }) {
    return <Box sx={{ height: "100%", width: "100%", border: "1px solid black", backgroundColor: "yellow" }}>
        {children}
        <Typography variant="h6">{installation.health}</Typography>
    </Box>
};
