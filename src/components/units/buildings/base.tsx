import { Box } from "@mui/material";
import { Base } from "../../../modules/buildings/base";

export default function BaseComponent({ base }: { base: Base }) {
    return <Box sx={{ width: "50%", height: "50%", backgroundColor: "lightblue", border: "1px solid black" }} />
};

