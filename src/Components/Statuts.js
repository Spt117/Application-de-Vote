import { useEffect, useState } from "react"

export default function Statuts({ statut }) {
    const oldStatut = "oldStatut"
    const currentStatut = "currentStatut"
    const nextStatut = "nextStatut"
    const [className0, setClassName0] = useState()
    const [className1, setClassName1] = useState()
    const [className2, setClassName2] = useState()
    const [className3, setClassName3] = useState()
    const [className4, setClassName4] = useState()
    const [className5, setClassName5] = useState()

    useEffect(() => {
        set()
        // eslint-disable-next-line 
    }, [statut])

    function set() {
        if (statut === 0) {
            setClassName0(currentStatut)
            setClassName1(nextStatut)
            setClassName2(nextStatut)
            setClassName3(nextStatut)
            setClassName4(nextStatut)
            setClassName5(nextStatut)
        }

        else if (statut === 1) {
            setClassName0(oldStatut)
            setClassName1(currentStatut)
            setClassName2(nextStatut)
            setClassName3(nextStatut)
            setClassName4(nextStatut)
            setClassName5(nextStatut)
        }

        else if (statut === 2) {
            setClassName0(oldStatut)
            setClassName1(oldStatut)
            setClassName2(currentStatut)
            setClassName3(nextStatut)
            setClassName4(nextStatut)
            setClassName5(nextStatut)
        }

        else if (statut === 3) {
            setClassName0(oldStatut)
            setClassName1(oldStatut)
            setClassName2(oldStatut)
            setClassName3(currentStatut)
            setClassName4(nextStatut)
            setClassName5(nextStatut)
        }

        else if (statut === 4) {
            setClassName0(oldStatut)
            setClassName1(oldStatut)
            setClassName2(oldStatut)
            setClassName3(oldStatut)
            setClassName4(currentStatut)
            setClassName5(nextStatut)
        }
        else if (statut === 5) {
            setClassName0(oldStatut)
            setClassName1(oldStatut)
            setClassName2(oldStatut)
            setClassName3(oldStatut)
            setClassName4(oldStatut)
            setClassName5(currentStatut)
        }
    }

    // if(statut)
    return (
        <div className="statuts">
            <h3>Statut de la session de vote</h3>
            <p className={className0} >1-Enregistrement des votants</p>
            <p className={className1} >2-Enregistrement des proposition</p>
            <p className={className2} >3-Fin de l'enregistrement des propositions</p>
            <p className={className3} >4-Début du vote</p>
            <p className={className4} >5-Fin du vote</p>
            <p className={className5} >6-Résultat du vote</p>
        </div>
    )
}