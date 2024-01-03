import { Typography } from "@mui/material";
import { Installation } from "../../../modules/buildings/installation";

export default function InstallationComponent({ installation, children }: { installation: Installation, children: React.ReactNode }) {
    return <>
        {children}
        <Typography variant="body2">{installation.health}</Typography>
    </>
};
