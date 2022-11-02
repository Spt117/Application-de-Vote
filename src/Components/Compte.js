import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function Compte({ addr, id, owner, set, get, setOwner, voter, contract, statut }) {
    const [loaderStatut, setLoaderStatut] = useState()
    const [loader, setLoader] = useState()
    const [ownerShip, setOwnerShip] = useState()
    const truncate = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

    useEffect(() => {
        if (owner) {
            eventOwner()
        }
        // eslint-disable-next-line
    }, [owner])

    //formater l'adresse de connexion à afficher
    function truncateAddr(address) {
        const match = address.match(truncate);
        if (!match) return address;
        return `${match[1]}…${match[2]}`;

    }

    // récupérer le bon réseau de connecté
    function network() {
        if (id === 5) {
            return "Goerli"
        }
        else if (id === 11155111) {
            return "Sepolia"
        }
        else if (id === 1)
            return "Ethereum Mainnet"
    }

    // récupérer la propriété du contrat
    async function getOwnership() {
        setLoader(true)
        try {
            const transaction = await set.transferOwnership(ownerShip)
            await transaction.wait()
        }
        catch {
            console.log("échec du transfer")
        }
        finally {
            setLoader(false)
        }
    }

    // récupérer le nouveau propriétaire du contrat
    function eventOwner() {
        get.on("OwnershipTransferred", (oldOwner, newOwner) => {
            setOwner(newOwner)
        })
    }

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

    if (addr)
        return (
            <div className="parent">
                <div className="child">
                    <p><strong>Réseau : </strong>{network(id)}</p>
                    <p><strong>Addresse de connexion : </strong>{truncateAddr(addr)}</p>
                    <p id="contrat"><strong>Contrat : </strong>{contract}</p>
                    {voter && <h6 className="enregistrement">Vous êtes enregistré pour cette session de vote !</h6>}
                    {!voter && <h6 className="enregistrement">Vous n'êtes pas enregistré pour cette session de vote !</h6>}
                </div>
                <div className="child">
                    {(owner !== addr) && <div className="owner">
                        <h6>Tester le système de vote :</h6>
                        <p>Vous pouvez récupérer la propriété du contrat pour l'essayer ! <br /> Rentrez votre addresse ci dessous :</p>
                        <input onChange={(e) => setOwnerShip(e.target.value)} placeholder=" Votre addresse"></input>
                        <button onClick={getOwnership}>
                            OK {loader && <Spinner animation="border" role="status" size="sm" />}
                        </button>
                    </div>}
                    {owner === addr && <div className="owner">
                        <h4>Dashboard Administrateur</h4>
                        <h6>Changer le statut de la session de vote :</h6>
                        <button id="buttonmarge" onClick={changeStatut}>Statut suivant {loaderStatut && <Spinner animation="border" role="status" size="sm" />}</button>
                    </div>}
                </div>
            </div>
        )
}