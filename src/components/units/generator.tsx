import { Box } from "@mui/material";
import { Generator } from "../../modules/generator";

export default function GeneratorComponent({ generator }: { generator: Generator }) {
    return <Box sx={{ minWidth: "40px", minHeight: "40px", backgroundColor: "yellow", border: "1px solid black" }} />;
};

