
import { Installation } from "../../../modules/buildings/installation";

export default function InstallationComponent({ installation, children }: { installation: Installation, children: React.ReactNode }) {
    return <>
        {children}
        <div>{installation.health} ❤</div>
    </>
};
