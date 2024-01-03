import { Box, Typography } from "@mui/material";
import { Invader } from "../../modules/invader";

export default function InvaderComponent({ invader }: { invader: Invader }) {
    return <Box sx={{ width: "80%", height: "80%", backgroundColor: "grey", border: "1px solid black", }} >
        <Typography variant="h6" sx={{ textAlign: "center" }}> {invader.health} </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}> {invader.template.type} </Typography>
    </Box>;
};

