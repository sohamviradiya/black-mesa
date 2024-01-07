import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Difficulty } from "../modules/state";

export default function Main() {
    const [difficulty, setDifficulty] = useState<Difficulty>("ROOKIE");

    return (
        <div style={{ backgroundColor: '#000033', display: "flex", flexDirection: "column", height: "100vh", margin: "-0.5vw" }}>
            <header style={{ padding: '0.75rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', height: '3.5rem', display: 'flex', alignItems: 'center' }}>
                <Link style={{ display: 'flex', alignItems: 'center', color: 'white' }} to="/">
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.025em' }}> Black Mesa </h1>
                </Link>
            </header>
            <main style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <section style={{ width: '100%', paddingTop: '1.5rem', paddingBottom: '3rem', paddingLeft: '1rem', paddingRight: '1.5rem' }}>
                    <div style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
                        <div style={{ gap: '0.5rem' }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: '-0.025em', color: 'white', }}>
                                Black Mesa
                            </h1>
                            <p style={{ maxWidth: '600px', color: '#ccc', fontSize: '1.25rem', margin: '0 auto' }}>
                                Choose the difficulty level that suits your gaming skills.
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '400px', margin: '0 auto' }}>
                            <select style={{ width: '100%', backgroundColor: '#ffffff', color: 'black', padding: '0.75rem', border: 'none', fontSize: '1.25rem' }} value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                                <option value="ROOKIE">Rookie</option>
                                <option value="CASUAL">Casual</option>
                                <option value="MASTER">Master</option>
                                <option value="VETERAN">Veteran</option>
                                <option value="INSANE">Insane</option>
                            </select>

                            <Link to={`/play?difficulty=${difficulty}`} style={{ textDecoration: 'none', color: 'black', cursor: "grab" }}>
                                <button style={{ width: '100%', backgroundColor: '#ADD8E6', color: 'black', padding: '0.75rem', border: 'none', fontSize: '1.25rem' }}>Play</button>
                            </Link>

                        </div>
                    </div>
                </section>
            </main>
            <footer style={{ flexDirection: 'column', gap: '0.25rem', paddingTop: '1.5rem', paddingBottom: '1.5rem', maxWidth: '100%', flexShrink: '0', display: 'flex', alignItems: 'center', paddingLeft: '1rem', paddingRight: '1.5rem', borderTop: '1px solid #333' }}>
                <p style={{ fontSize: '0.75rem', color: '#888' }}>© Black Mesa. All rights reserved.</p>
                <nav style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link style={{ fontSize: '0.75rem', textDecoration: 'underline', color: '#888' }} to="https://github.com/sohamviradiya/black-mesa">
                        Github Repo
                    </Link>
                </nav>
            </footer>
        </div>
    )
}
