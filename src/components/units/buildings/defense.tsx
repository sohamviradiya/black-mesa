import {  Typography } from "@mui/material";
import { Defense } from "../../../modules/buildings/defenses";

export default function DefenseComponent({ defense, children }: { defense: Defense, children: React.ReactNode }) {
    return <>
        {children}
        <Typography variant="h6" sx={{ textAlign: "center" }}> {defense.template.type} </Typography>
    </>;
};

