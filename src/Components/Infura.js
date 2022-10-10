import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Vote from '../../src/artifacts/contracts/Vote.sol/Vote.json';

export default function Infura () {
    const [goerli, setGoerli] = useState();
    const [sepolia, setSepolia] = useState();

    useEffect(() => {
        getValues()
    },[])

    
    async function getValues() {
        const providerGoerli = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/0f64fa14d1b04119bcc600521f8dd9ea`);
        const providerSepolia = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/0f64fa14d1b04119bcc600521f8dd9ea`);
        const getGoerli = new ethers.Contract("0x27A0bF8B26D7Caee8b783de380E7Cc6319E6BA11", Vote.abi, providerGoerli)
        const getSepolia = new ethers.Contract("0x4Aec1F50164e9B09EcD966495993a47fb0B80467", Vote.abi, providerSepolia)

        const g = await getGoerli.getData()
        setGoerli(g.toNumber())
        const s = await getSepolia.getData()
        console.log(s)
        setSepolia(s.toNumber())
    }

    return (
        <div>
            <p>La valeur sur Goerli est: {goerli}</p>
            <p>La valeur sur Sepolia est: {sepolia}</p>
        </div>
    )
}