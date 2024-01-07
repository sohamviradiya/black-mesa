import { Barricade } from "../../../modules/buildings/barricade";

export default function BarricadeComponent({ barricade }: { barricade: Barricade }) {
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src="/images/barricade.svg" alt="base" height={barricade.height * 0.8} width={barricade.width} />
    </div>
};

