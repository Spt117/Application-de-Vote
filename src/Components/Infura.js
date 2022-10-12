import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Vote from '../../src/artifacts/contracts/Vote.sol/Vote.json';

export default function Infura() {
    const [goerli, setGoerli] = useState();
    const [sepolia, setSepolia] = useState();
    const providerGoerli = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/0f64fa14d1b04119bcc600521f8dd9ea`);
    const providerSepolia = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/0f64fa14d1b04119bcc600521f8dd9ea`);
    const getGoerli = new ethers.Contract("0x534F9541610BC6236D6CC22180EE37F283A06C18", Vote.abi, providerGoerli)
    const getSepolia = new ethers.Contract("0x9a8Bc42F255E1BC214c9f0D8c383CD5A785Ef390", Vote.abi, providerSepolia)



    function test() {
        getGoerli.once("NewData", (newdata) => {
            console.log(newdata.toNumber())
            setGoerli(newdata.toNumber())
        })
        
        getSepolia.once("NewData", (newdata) => {
            console.log(newdata.toNumber())
            setSepolia(newdata.toNumber())
        })
    }

    useEffect(() => {
        getValues()
        test()
        // eslint-disable-next-line
    }, [])

    async function getValues() {
        const Goerli = await getGoerli.getData()
        setGoerli(Goerli.toNumber())
        const Sepolia = await getSepolia.getData()
        setSepolia(Sepolia.toNumber())
    }

    return (
        <div>
            <p>La valeur sur Goerli est: {goerli}</p>
            <p>La valeur sur Sepolia est: {sepolia}</p>
        </div>
    )

}