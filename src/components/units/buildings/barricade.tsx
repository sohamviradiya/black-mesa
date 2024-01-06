import { Box } from "@mui/material";
import { Barricade } from "../../../modules/buildings/barricade";
import barricadeImg from "../../../assets/images/barricade.svg";

export default function BarricadeComponent({ barricade }: { barricade: Barricade }) {
    return <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={barricadeImg} alt="base" height={barricade.height * 0.8} width={barricade.width} />
    </Box>
};

