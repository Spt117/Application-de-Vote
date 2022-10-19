import { useState } from "react"
import Spinner from 'react-bootstrap/Spinner';

export default function Owner({ addr, owner, statut, set, get }) {
    const [loaderStatut, setLoaderStatut] = useState()
    const [loaderRegister, setLoaderRegister] = useState()
    const [addrRegister, setAddrRegister] = useState()


    // changer le statut de la session de vote
    async function changeStatut() {
        setLoaderStatut(true)
        let transaction
       try{ switch (statut) {
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
        }}
        catch {
            console.log("La transaction a échoué")
        }
        finally
        {setLoaderStatut(false)}
    }

    // enregister les électeurs
    async function registerVoter() {
        setLoaderRegister(true)
        try {
            const register = await set.getVoter(addrRegister)
            if (!register[0]) {
                const transaction = await set.addVoter(addrRegister)
                await transaction.wait()
            }
            else {alert("Cette adresse est déjà enregistrée !")}
        }
        catch {
            alert("L'enregistrement de cette adresse a échoué, vérifiez le format de l'adresse !")
        }
        finally {
            setLoaderRegister(false)
        }
    }

    if (owner === addr)
        return (
            <div id="owner">
                <div>
                    <h6>Changer le statut de la session de vote :</h6>
                    <button onClick={changeStatut}>Statut suivant {loaderStatut && <Spinner animation="border" role="status" size="sm" />}</button>
                </div>
                {statut === 0 && <div><hr/>
                    <h6>Vous pouvez enregistrer les électeurs :</h6>
                    <input placeholder="Adresse" onChange={(e) => setAddrRegister(e.target.value)}></input>
                    <button onClick={registerVoter}>Enregistrer {loaderRegister && <Spinner animation="border" role="status" size="sm" />}</button>
                </div>}
            </div>
        )
}