import { Box } from "@mui/material";
import { Building } from "../../modules/building";

export default function BuildingComponent({ building, children, demolishBuilding }: { building: Building, children: React.ReactNode, demolishBuilding: (building: Building) => void }) {

    return <Box sx={{ border: "2px solid blue", width: "100%", height: "100%" }} onContextMenu={
        (e) => {
            e.preventDefault();
            demolishBuilding(building);
        }
    } >
        {children}
    </Box>;
};

