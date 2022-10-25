import { useEffect, useState } from "react"

export default function Statuts({ statut }) {
    const oldStatut = "oldStatut"
    const currentStatut = "currentStatut"
    const nextStatut = "nextStatut"
    const [className, setClassName] = useState()

    useEffect(() => {
        set()
    }, [statut])

    function set() {
        if(statut===0)
        setClassName(currentStatut)
        else
        setClassName(oldStatut)
    }


    return(
        <div>
            <h3>Statut de la session de vote</h3>
            <p className={className} id="1">1-Enregistrement des votants</p>
            <p className="nextStatut" id="2">2-Enregistrement des proposition</p>
            <p className="nextStatut" id="3">3-Fin de l'enregistrement des propositions</p>
            <p className="nextStatut" id="4">4-Début du vote</p>
            <p className="nextStatut" id="5">5-Fin du vote</p>
            <p className="nextStatut" id="6">6-Résultat du vote</p>
        </div>
    )
}