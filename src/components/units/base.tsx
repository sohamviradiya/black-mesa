import { Box } from "@mui/material";
import { Base } from "../../modules/base";

export default function BaseComponent({ base }: { base: Base }) {
    return <Box sx={{ minWidth: "40px", minHeight: "40px", backgroundColor: "lightblue", border: "1px solid black" }} />;
};

