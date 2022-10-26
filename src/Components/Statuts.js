import { useEffect, useState } from "react"

export default function Statuts({ statut }) {
    const oldStatut = "oldStatut"
    const currentStatut = "currentStatut"
    const nextStatut = "nextStatut"
    const [theClass, setClass] = useState()

    useEffect(() => {
        if (statut !== undefined)
            set()
        // eslint-disable-next-line 
    }, [statut])

    function set() {
        const thisClass = [{ thestatut: 0, idClass: nextStatut }, { thestatut: 1, idClass: nextStatut }, { thestatut: 2, idClass: nextStatut }, { thestatut: 3, idClass: nextStatut }, { thestatut: 4, idClass: nextStatut }, { thestatut: 5, idClass: nextStatut }]
        for (let j = 0; j < 6; j++) {
            if (statut === thisClass[j].thestatut)
                thisClass[j].idClass = currentStatut
            else if (statut < thisClass[j].thestatut)
                thisClass[j].idClass = nextStatut
            else if (statut > thisClass[j].thestatut)
                thisClass[j].idClass = oldStatut
        }
        setClass(thisClass)
    }

    if (theClass !== undefined)
        return (
            <div className="statuts">
                <h3>Statut de la session de vote</h3>
                <p className={theClass[0].idClass} >1-Enregistrement des votants</p>
                <p className={theClass[1].idClass} >2-Enregistrement des proposition</p>
                <p className={theClass[2].idClass} >3-Fin de l'enregistrement des propositions</p>
                <p className={theClass[3].idClass} >4-Début du vote</p>
                <p className={theClass[4].idClass} >5-Fin du vote</p>
                <p className={theClass[5].idClass} >6-Résultat du vote</p>
            </div>
        )
}