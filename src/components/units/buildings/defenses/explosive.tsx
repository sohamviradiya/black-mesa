import { Box, Typography } from "@mui/material";
import { Explosive } from "../../../../modules/buildings/explosive";
import explosiveImg from "../../../../assets/images/explosive.svg";

export default function ExplosiveComponent({ explosive }: { explosive: Explosive }) {
    return <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={explosiveImg} alt="base" height={explosive.height * 0.7} width={explosive.width} />
        </Box>
        <Typography>⌛ {explosive.timer}</Typography>
    </>;
};