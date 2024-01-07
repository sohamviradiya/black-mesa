import { Base } from "../../../modules/buildings/base";

export default function BaseComponent({ base }: { base: Base }) {
    return (
        <div>
            <img src="/images/base.svg" alt="base" height={base.height * 0.6} width={base.width} />
        </div>
    )
};

