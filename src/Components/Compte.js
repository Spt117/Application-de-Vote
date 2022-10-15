import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function Compte({ addr, id, owner, set }) {
    const [loader, setLoader] = useState()
    const [ownerShip, setOwnerShip] = useState()
    const truncate = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

    function truncateAddr(address) {
        const match = address.match(truncate);
        if (!match) return address;
        return `${match[1]}…${match[2]}`;

    }

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

    async function getOwner() {
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

    if (addr)
        return (
            <div>
                <h6>Réseau :</h6>
                <p>{network(id)}</p>
                <h6>Addresse de connexion :</h6>
                <p>{truncateAddr(addr)}</p>
                <p></p>
                {(owner !== addr) && <div>
                    <h6>Tester le système de vote</h6>
                    <p>Vous pouvez récupérer la propriété du contrat pour l'essayer ! <br></br> Rentrez votre addresse ci dessous :</p>
                    <input onChange={(e) => setOwnerShip(e.target.value)} placeholder=" Votre addresse"></input>
                    <button onClick={getOwner}>
                        OK {loader && <Spinner animation="border" role="status" size="sm" />}
                    </button>
                </div>}

            </div>
        )
}