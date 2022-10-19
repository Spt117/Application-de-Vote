import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function Compte({ addr, id, owner, set, get, setOwner, statut }) {
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
    function network(id) {
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

    if (addr)
        return (
            <div>
                <p><strong>Réseau : </strong>{network(id)}</p>
                <p><strong>Addresse de connexion : </strong>{truncateAddr(addr)}</p>
                {(owner !== addr) && <div id="getVote">
                    <h6>Tester le système de vote :</h6>
                    <p>Vous pouvez récupérer la propriété du contrat pour l'essayer ! <br/> Rentrez votre addresse ci dessous :</p>
                    <input onChange={(e) => setOwnerShip(e.target.value)} placeholder=" Votre addresse"></input>
                    <button onClick={getOwnership}>
                        OK {loader && <Spinner animation="border" role="status" size="sm" />}
                    </button>
                </div>}
            </div>
        )
}