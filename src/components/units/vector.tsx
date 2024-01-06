import { VectorUnit } from "../../modules/unit";

export default function VectorComponent({ unit, children }: { unit: VectorUnit, children: React.ReactNode }) {
    return (
        <div
            key={unit.id}
            style={{
                width: `${unit.width}px`,
                height: `${unit.height}px`,
                position: "absolute",
                top: `${unit.y}px`,
                left: `${unit.x}px`,
                textAlign: "center",
                zIndex: 2,
                transform: `translate(-50%, -50%) rotate(${unit.angle}rad)`,
                transformOrigin: "center center",
                fontSize: `${0.5 * unit.height}px`,
            }}
        >
            {children}
        </div>
    );
};
