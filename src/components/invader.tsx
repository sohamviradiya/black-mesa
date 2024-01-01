import { Invader } from "../modules/invader";

export default function InvaderComponent({ invader }: { invader: Invader }) {
    return (
        <div style={{ position: "absolute", top: invader.x, left: invader.y, width: invader.width, height: invader.height, backgroundColor: "purple" }}>
        </div>
    );
};