import { useEffect, useState } from "react";

export default function Dapp({ get, set }) {
    const [theData, setTheData] = useState();
    const [theNewData, setTheNewData] = useState();

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
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const transaction = await set.setData(theNewData)
        await transaction.wait()
        gData()
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
                    <button onClick={gData}>Vérifier la valeur de Data</button>
                    <p>Data : {theData}</p>
                </div>
                <div>
                    <button onClick={newData}>Envoyer une nouvelle valeur</button>
                    <p> <input placeholder='Nouvelle valeur' onChange={inputValue}></input></p>
                </div>
            </div>
        </div>
    )
}