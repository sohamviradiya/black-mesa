import { Box, Typography } from "@mui/material";
import { Defense } from "../../../modules/buildings/defenses";

export default function DefenseComponent({ defense, children }: { defense: Defense, children: React.ReactNode }) {
    return <Box sx={{ width: "90%", height: "90%", backgroundColor: "crimson", border: "1px solid black", transform: `rotate(${defense.angle}rad)`}}>
        {children}
        <Typography variant="h6" sx={{ textAlign: "center" }}> {defense.template.type} </Typography>
    </Box>;
};

