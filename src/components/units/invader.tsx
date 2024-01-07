import { Invader } from "../../modules/invader";


export default function InvaderComponent({ invader }: { invader: Invader }) {
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: invader.width, height: invader.height * 0.8 }}>
        <img src={getInvaderImage(invader)} alt="base" height={invader.height * 0.8} width={invader.width} />
    </div>;
};

function getInvaderImage(invader: Invader) {
    switch (invader.template.type) {
        case "ALPHA": return "/images/alpha.svg";
        case "GAMMA": return "/images/gamma.svg";
        case "LAMBDA": return "/images/lambda.svg";
        case "OMEGA": return "/images/omega.svg";
        case "SIGMA": return "/images/sigma.svg";
        default: return "/images/alpha.svg";
    }
}
