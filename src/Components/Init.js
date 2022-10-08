import { ethers } from "ethers";
import { useEffect } from "react";
import Vote from '../../src/artifacts/contracts/Vote.sol/Vote.json';

export default function Init({setSet, setGet}) {
    // const [theProvider, setProvider] = useState()

    const voteAddress = "0x27A0bF8B26D7Caee8b783de380E7Cc6319E6BA11"
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const getContract = new ethers.Contract(voteAddress, Vote.abi, provider)
    const setContract = new ethers.Contract(voteAddress, Vote.abi, signer)

    function init() {
        // setProvider(provider)
        setSet(setContract)
        setGet(getContract)
        
    }

    useEffect(() => {
        init()
   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 
}