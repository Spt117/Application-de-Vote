import { useEffect, useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"

export default function Dapp({ id, owner, set, addr, statut, voter }) {
    const statuts = ["Enregistrement des électeurs", "Enregistrement des propositions", "Enregistrement des propositions terminé", "Vote en cours", "Vote terminé", "Résultat du vote"]
    const [loader, setLoader] = useState()
    const [loaderVote, setLoaderVote] = useState()
    const [proposition, setProposition] = useState()
    const [vote, setVote] = useState()
    const [currentStatut, setCurrentStatut] = useState()

    useEffect(() => {
        if (statut !== undefined) {
            setCurrentStatut(statuts[statut])
        }
        // eslint-disable-next-line
    }, [statut, addr, voter, id])

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

    async function voted() {
        setLoaderVote(true)
        try {
            const transaction = await set.setVote(vote)
            await transaction.wait()
        }
        catch {
            alert("Votre vote a achoué, vérifiez que votre numéro de proposition soit valable.")
        }
        finally {
            setLoaderVote(false)
        }
    }

    return (
        <div >
            {(voter || (addr === owner)) &&
                <div className='parent' id='two'>
                    <div>
                        <h4>Statut de la session de vote</h4>
                        <p>{currentStatut}</p></div>
                    {statut === 1 && <div>
                        <div>
                            <h5>Vous pouvez enregistrer votre proposition :</h5>
                            <input placeholder="Votre proposition" onChange={(e) => setProposition(e.target.value)} />
                            <button onClick={ajouterProposition}>Enregistrer {loader && <Spinner animation="border" role="status" size="sm" />}</button>
                        </div>
                    </div>}
                    {statut === 3 && <div>
                        <h5>Vous pouvez voter !</h5>
                        <input placeholder="Numéro de la proposition" onChange={(e) => setVote(e.target.value)} />
                        <button onClick={voted}>Voter {loaderVote && <Spinner />}</button>
                    </div>}
                </div>}
            {!voter && <div>Vous n'êtes pas enregistré pour cette session de vote !</div>}
        </div>
    )
}