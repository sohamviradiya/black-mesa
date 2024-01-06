import { Box } from "@mui/material";
import { Generator } from "../../../modules/buildings/generator";
import generatorImg from "../../../assets/images/generator.svg";

export default function GeneratorComponent({ generator }: { generator: Generator }) {
    return <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={generatorImg} alt="base" height={generator.height * 0.8} width={generator.width} />
    </Box>
};

