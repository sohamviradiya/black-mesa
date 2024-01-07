import { Generator } from "../../../modules/buildings/generator";

export default function GeneratorComponent({ generator }: { generator: Generator }) {
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src="/images/generator.svg" alt="base" height={generator.height * 0.8} width={generator.width} />
    </div>;
};

