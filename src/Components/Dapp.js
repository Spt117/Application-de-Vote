import { useEffect, useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"

export default function Dapp({ get, set, owner, statut }) {
    const statuts = ["Enregistrement des électeurs", "Enregistrement des propositions", "Enregistrement des propositions terminé", "Vote en cours", "Vote terminé", "Résultat du vote"]
    const [loader, setLoader] = useState()
    const [proposition, setProposition] = useState()


    async function ajouterProposition() {
        setLoader(true)
        try {
            const transaction = await set.addProposal(proposition)
            await transaction.wait()
        }
        catch {
            alert("Echec de l'enregistrement !")
        }
        finally {
            setLoader(false)
        }
    }


    return (
        <div>
            <h4>Statut de la session de vote</h4>
            <p>{statuts[statut]}</p>
            <hr></hr>
            {statut === 1 && <div>
                <h5>Vous pouvez enregistrer votre proposition :</h5>
                <input placeholder="Votre proposition" onChange={(e) => setProposition(e.target.value)}></input>
                <button onClick={ajouterProposition}>Enregistrer {loader && <Spinner animation="border" role="status" size="sm" />}</button>
            </div>}
        </div>
    )
}