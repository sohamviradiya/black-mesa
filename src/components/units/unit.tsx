import { Unit } from "../../modules/unit";

export default function UnitComponent({ unit, children }: { unit: Unit, children: React.ReactNode }) {
    return (
        <div
            key={unit.id}
            style={{
                width: `${unit.width}px`,
                height: `${unit.height}px`,
                border: "1px solid black",
                position: "absolute",
                top: `${unit.y}px`,
                left: `${unit.x}px`,
                transform: "translate(-50%, -50%)",
                zIndex: 0,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: `${0.2 * unit.height}px`,
            }}
        >
            {children}
        </div>
    );
};
