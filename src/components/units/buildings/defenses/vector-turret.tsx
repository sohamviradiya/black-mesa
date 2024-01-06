
import { VectorTurret } from "../../../../modules/buildings/defenses";

export default function VectorTurretComponent({ turret }: { turret: VectorTurret }) {
    return <div
        style={{
            border: "1px solid black",
            width: "100%",
            height: "20%",
            cursor: "pointer",
        }}
        onClick={() => turret.setAlignment()}
    >
        <p style={{ margin: 0 }}>{turret.alignment}</p>
    </div>;
};

