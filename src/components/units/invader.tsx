import { Box, Typography } from "@mui/material";
import { Invader } from "../../modules/invader";
import alphaImg from "../../assets/images/alpha.svg";
import gammaImg from "../../assets/images/gamma.svg";
import lambdaImg from "../../assets/images/lambda.svg";
import omegaImg from "../../assets/images/omega.svg";
import sigmaImg from "../../assets/images/sigma.svg";

export default function InvaderComponent({ invader }: { invader: Invader }) {
    return <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: invader.width, height: invader.height }}>
        <Typography variant="body2">❤ {invader.health} </Typography>
        <img src={getInvaderImage(invader)} alt="base" height={invader.height * 0.8} width={invader.width} />
    </Box>;
};

function getInvaderImage(invader: Invader) {
    switch (invader.template.type) {
        case "ALPHA": return alphaImg;
        case "GAMMA": return gammaImg;
         case "LAMBDA": return lambdaImg;
        case "OMEGA": return omegaImg;
        case "SIGMA": return sigmaImg;
        default: return alphaImg;
    }
}
