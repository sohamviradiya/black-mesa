import { Box } from "@mui/material";
import { Unit } from "../../modules/unit";

export default function UnitComponent({ unit, children }: { unit: Unit, children: React.ReactNode }) {
    return (
        <Box
            key={unit.id}
            sx={{
                width: unit.width,
                height: unit.height,
                border: "1px solid black",
                position: "absolute",
                top: unit.y,
                left: unit.x,
                zIndex: 0,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {children}
        </Box>
    );
};
