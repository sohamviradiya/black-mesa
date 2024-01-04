import { Box } from "@mui/material";
import { VectorUnit } from "../../modules/unit";

export default function VectorComponent({ unit, children }: { unit: VectorUnit, children: React.ReactNode }) {
    return <Box key={unit.id}
        sx={{
            width: unit.width,
            height: unit.height,
            border: "1px solid black",
            position: "absolute",
            top: unit.y,
            left: unit.x,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            transform: `rotate(${unit.angle}rad)`,
            fontSize: 0.5 * unit.height,
        }}>
        {children}
    </Box>
};
