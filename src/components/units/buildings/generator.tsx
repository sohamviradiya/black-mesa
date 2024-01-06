import { Generator } from "../../../modules/buildings/generator";
import generatorImg from "../../../assets/images/generator.svg";

export default function GeneratorComponent({ generator }: { generator: Generator }) {
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={generatorImg} alt="base" height={generator.height * 0.8} width={generator.width} />
    </div>;
};

