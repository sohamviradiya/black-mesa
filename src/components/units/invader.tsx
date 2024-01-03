import { Box, Typography } from "@mui/material";
import { Invader } from "../../modules/invader";

export default function InvaderComponent({ invader }: { invader: Invader }) {
    return <Box sx={{ width: invader.height, height: invader.width, backgroundColor: "grey", border: "1px solid black", }} >
        <Typography variant="body1" sx={{ textAlign: "center" }}> {invader.template.type} </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}> {invader.health} </Typography>
    </Box>;
};

