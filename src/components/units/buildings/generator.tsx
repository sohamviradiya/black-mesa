import { Box } from "@mui/material";
import { Generator } from "../../../modules/buildings/generator";

export default function GeneratorComponent({ generator }: { generator: Generator }) {
    return <Box key={generator.id} sx={{ width: generator.width, height: generator.height, backgroundColor: "yellow", border: "1px solid black" }} />;
};

