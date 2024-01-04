import { Typography } from "@mui/material";
import { Building } from "../../modules/building";

export default function BuildingComponent({ building, children }: { building: Building, children: React.ReactNode }) {
    return <>
        {children}
        <Typography sx={{ textAlign: "center" }} >{building.type}</Typography>
    </>
};
