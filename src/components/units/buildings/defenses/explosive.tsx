import { Typography } from "@mui/material";
import { Explosive } from "../../../../modules/buildings/explosive";

export default function ExplosiveComponent({ explosive }: { explosive: Explosive }) {
    return <>
        <Typography variant="h6">{explosive.timer}</Typography>
    </>;
};