import { Box } from "@mui/material";
import { VectorUnit } from "../../modules/unit";

export default function VectorComponent({ unit, children }: { unit: VectorUnit, children: React.ReactNode }) {
    return <Box sx={{ zIndex: 2, transform: `rotate(${unit.angle}rad)` }}>
        {children}
    </Box>
};
