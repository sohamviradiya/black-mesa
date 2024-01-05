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
                transform: "translate(-50%, -50%)",
                zIndex: 0,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 0.5*unit.height,
            }}
        >
            {children}
        </Box>
    );
};
