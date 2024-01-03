import { ScalarTurret } from "../../modules/buildings/defenses";

export default function TurretComponent({ turret }: { turret: ScalarTurret }) {
    return (
        <div style={{ position: "absolute", top: turret.y, left: turret.x, width: turret.width, height: turret.height, backgroundColor: "red", zIndex: 1 }}>

        </div>
    );
};