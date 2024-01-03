import { Box } from "@mui/material";
import { Generator } from "../../../modules/buildings/generator";

export default function GeneratorComponent({ generator }: { generator: Generator }) {
    return <Box sx={{ width: "100%", height: "100%", backgroundColor: "yellow", border: "1px solid black" }} />;
};

