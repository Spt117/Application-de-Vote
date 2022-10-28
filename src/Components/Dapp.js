import { useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"

export default function Dapp({ id, owner, set, addr, statut, voter }) {
    const [loader, setLoader] = useState()
    const [loaderVote, setLoaderVote] = useState()
    const [proposition, setProposition] = useState()
    const [vote, setVote] = useState()
    const [loaderRegister, setLoaderRegister] = useState()
    const [addrRegister, setAddrRegister] = useState()

    // enregister les électeurs
    async function registerVoter() {
        setLoaderRegister(true)
        try {
            const register = await set.getVoter(addrRegister)
            if (!register[0]) {
                const transaction = await set.addVoter(addrRegister)
                await transaction.wait()
            }
            else { alert("Cette adresse est déjà enregistrée !") }
        }
        catch {
            alert("L'enregistrement de cette adresse a échoué, vérifiez le format de l'adresse !")
        }
        finally {
            setLoaderRegister(false)
        }
    }

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
            const register = await set.getVoter(addr)
            if (register[1] === true) {
                alert("Vous avez déjà voté !")
            }
            else {
                const transaction = await set.setVote(vote)
                await transaction.wait()
            }
        }
        catch {
            alert("Votre vote a échoué, vérifiez que votre numéro de proposition soit valable.")
        }
        finally {
            setLoaderVote(false)
        }
    }

    if (((statut === 0) && ((addr === owner) && addr !== undefined)) || (statut === 1 || statut === 3))
        return (
            <div id="Dapp">
                <div>
                    {statut === 0 && owner === addr && <div>
                        <h6>Vous pouvez enregistrer les électeurs :</h6>
                        <input placeholder="Adresse" onChange={(e) => setAddrRegister(e.target.value)}></input>
                        <button onClick={registerVoter}>Enregistrer {loaderRegister && <Spinner animation="border" role="status" size="sm" />}</button>
                    </div>}
                    {statut === 1 && <div>
                        <h5>Vous pouvez enregistrer votre proposition :</h5>
                        <input placeholder="Votre proposition" onChange={(e) => setProposition(e.target.value)} />
                        <button onClick={ajouterProposition}>Enregistrer {loader && <Spinner animation="border" role="status" size="sm" />}</button>
                    </div>}
                    {statut === 3 && <div>
                        <h5>Vous pouvez voter !</h5>
                        <input placeholder="Numéro de la proposition" onChange={(e) => setVote(e.target.value)} />
                        <button onClick={voted}>Voter {loaderVote && <Spinner animation="border" role="status" size="sm" />}</button>
                    </div>}
                </div>
            </div>
        )

    else if (!voter && addr)
        return (
            <div id="Dapp">
                <div>Vous n'êtes pas enregistré pour cette session de vote !</div>
            </div>
        )
}