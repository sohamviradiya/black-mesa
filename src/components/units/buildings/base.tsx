import { Base } from "../../../modules/buildings/base";
import baseImg from "../../../assets/images/base.svg";

export default function BaseComponent({ base }: { base: Base }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={baseImg} alt="base" height={base.height*0.8} width={base.width} />
        </div>
    )
};

