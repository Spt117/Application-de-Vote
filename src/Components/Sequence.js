import { sequence } from "0xsequence";
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function Sequence() {
    const [loader, setLoader] = useState()
    const [theButton, setButton] = useState();


    useEffect(() => {
        setButton(false)
        init()
    },[])

    function init() {

        // eslint-disable-next-line
        const wallet = sequence.initWallet()
    }
    // If your dapp runs on a different EVM-compatible blockchain, you can specify its name as the argument
    // const wallet = sequence.initWallet('polygon')

    async function connect() {

        try {
            setLoader(true)
            const wallet = sequence.getWallet()

            const connectDetails = await wallet.connect({
                app: 'Your Dapp name',
                authorize: true,
                // And pass settings if you would like to customize further
                settings: {
                    theme: "light",
                    bannerUrl: "https://yoursite.com/banner-image.png",  // 3:1 aspect ratio, 1200x400 works best
                    includedPaymentProviders: ["moonpay", "ramp"],
                    defaultFundingCurrency: "matic",
                    lockFundingCurrencyToDefault: false,
                }
            })

            console.log('user accepted connect?', connectDetails.connected)
            console.log('users signed connect proof to valid their account address:', connectDetails.proof)
            setButton(true)
        }
        catch{
            console.log("La connexion a échoué !")
    }
        finally{
            setLoader(false)
            
        }
}


    function openSequence() {
        const wallet = sequence.getWallet()
        wallet.openWallet();
    }

    return (
        <div>
            <h2>Sequence</h2>
            {!theButton && <button onClick={connect}>Connexion {loader && <Spinner animation="border" role="status" size="sm" />}</button>}
            <p></p>
            <button onClick={openSequence}>Open Walet</button>
        </div>
    )




}