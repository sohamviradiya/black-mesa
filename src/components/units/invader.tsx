import { Box } from "@mui/material";
import { Invader } from "../../modules/invader";
import { radiansToDegrees } from "../../modules/geometry";

export default function invaderComponent({ invader }: { invader: Invader }) {
    const angle = radiansToDegrees(invader.angle);

    return <Box sx={{ width: invader.width , height: invader.height, backgroundColor: "grey", border: "1px solid black", zIndex: 2 , transform: `rotate(${angle}deg)` }} />;
};

