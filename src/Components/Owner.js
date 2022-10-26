import { useState } from "react"
import Spinner from 'react-bootstrap/Spinner';

export default function Owner({ addr, owner, statut, set }) {
    const [loaderStatut, setLoaderStatut] = useState()

    // changer le statut de la session de vote
    async function changeStatut() {
        setLoaderStatut(true)
        let transaction
        try {
            switch (statut) {
                case 0:
                    transaction = await set.startProposalsRegistering()
                    await transaction.wait()
                    break
                case 1:
                    transaction = await set.endProposalsRegistering()
                    await transaction.wait()
                    break
                case 2:
                    transaction = await set.startVotingSession()
                    await transaction.wait()
                    break
                case 3:
                    transaction = await set.endVotingSession()
                    await transaction.wait()
                    break
                case 4:
                    transaction = await set.tallyVotes()
                    await transaction.wait()
                    break
                case 5:
                    transaction = await set.reset()
                    await transaction.wait()
                    break
                default:
                    alert("Echec du changement de statut !")
            }
        }
        catch {
            console.log("La transaction a échoué")
        }
        finally { setLoaderStatut(false) }
    }

    if (owner === addr)
        return (
            <div id="owner">
                <h6>Changer le statut de la session de vote :</h6>
                <button onClick={changeStatut}>Statut suivant {loaderStatut && <Spinner animation="border" role="status" size="sm" />}</button>
            </div>
        )
}