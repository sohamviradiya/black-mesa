import { Box } from "@mui/material";
import { Invader } from "../../modules/invader";

export default function invaderComponent({ invader }: { invader: Invader }) {
    return <Box sx={{ width: invader.width, height: invader.height, backgroundColor: "grey", border: "1px solid black", zIndex: 2, transform: `rotate(${invader.angle}rad)` }} />;
};

