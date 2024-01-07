import { Explosive } from "../../../../modules/buildings/explosive";

export default function ExplosiveComponent({ explosive }: { explosive: Explosive }) {
    return <>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="/images/explosive.svg" alt="base" style={{ height: `${explosive.height * 0.7}px`, width: `${explosive.width}px` }} />
            <p style={{ margin: 0 }}>⌛ {explosive.timer}</p>
        </div>
    </>;
};