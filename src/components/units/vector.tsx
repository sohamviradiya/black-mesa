import { Box } from "@mui/material";
import { VectorUnit } from "../../modules/unit";

export default function VectorComponent({ unit, children }: { unit: VectorUnit, children: React.ReactNode }) {
    return <Box key={unit.id}
        sx={{
            width: unit.width,
            height: unit.height,
            position: "absolute",
            top: unit.y,
            left: unit.x,
            textAlign: "center",
            zIndex: 2,
            transform: `translate(-50%, -50%) rotate(${unit.angle}rad)`,
            transformOrigin: "center center",
            fontSize: 0.5 * unit.height,
        }}>
        {children}
    </Box>
};
