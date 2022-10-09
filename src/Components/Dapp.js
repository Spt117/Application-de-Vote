import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function Dapp({ get, set }) {
    const [theData, setTheData] = useState();
    const [theNewData, setTheNewData] = useState();
    const [bool, setBool] = useState();

    useEffect(() => {
        if (get) {
            gData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [get, set])

    //récupérer la valeur de data (big number)
    async function gData() {
        const data = await get.getData()
        setTheData(data.toNumber())
    }

    //changer la valeur de data
    async function newData() {
        setBool(true)
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const transaction = await set.setData(theNewData)
            await transaction.wait()
            gData()
        }
        catch {
            console.log("La transaction a échoué !")
        }
        finally {
            setBool(false)
        }
    }

    //récupérer la valeur dans l'input
    function inputValue(e) {
        setTheNewData(e.target.value)
    }

    return (
        <div>
            <h1>Data</h1>
            <div id='parent'>
                <div>
                    {/* <Button variant="primary" onClick={gData}>Vérifier la valeur de Data</Button> */}
                    <p>Data : {theData}</p>
                </div>
                <div>
                    <Button variant="primary" onClick={newData}>
                        Envoyer une nouvelle valeur {bool && <Spinner animation="border" role="status" size="sm" />}
                    </Button>
                    <p> <input placeholder='Nouvelle valeur' onChange={inputValue}></input></p>
                </div>
            </div>
        </div>
    )
}