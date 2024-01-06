
import { Installation } from "../../../modules/buildings/installation";

export default function InstallationComponent({ installation, children }: { installation: Installation, children: React.ReactNode }) {
    return <>
        {children}
        <p style={{ fontSize: "1rem"}}>{installation.health} ❤</p>
    </>
};
