import { Base } from "../../../modules/buildings/base";
import baseImg from "../../../assets/images/base.svg";

export default function BaseComponent({ base }: { base: Base }) {
    return (
        <div>
            <img src={baseImg} alt="base" height={base.height*0.6} width={base.width} />
        </div>
    )
};

