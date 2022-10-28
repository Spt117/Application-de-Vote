import { useEffect, useState } from "react"


export default function Alerte({ set }) {
    const [idAlert, setIdAlerte] = useState("alert")

    useEffect(() => {
        if(set)
        eventProposition()
    })

    function handleAlert() {
        // On passe la balise Block a l'id #alert ce qui l'affiche
        setIdAlerte("alert2")
        // On lance un setTimeout qui au bout de 3 seconde va remttre le display a none;
        setTimeout(() => {
            setIdAlerte("alert")

        }, 3000)
    }

    function eventProposition() {
        set.on("ProposalRegistered", (description, voteCount) => {
            handleAlert()
        })
    }
    return (
        <div id="le">
            <div>
                <button onClick={handleAlert}>Test</button>
            </div>
            <div className="message" id={idAlert}>
                Nouvelle proposition détectée !
            </div>
        </div>
    )
}