import { Box, Typography } from "@mui/material";
import { Installation } from "../../../modules/buildings/installation";

export default function InstallationComponent({ installation, children }: { installation: Installation, children: React.ReactNode }) {
    return <Box sx={{
        width: "80%",
        height: "80%",
        border: "1px solid black",
        backgroundColor: "yellow",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }}>
        {children}
        <Typography variant="body2">{installation.health}</Typography>
    </Box>
};
