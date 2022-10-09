import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Vote from '../../src/artifacts/contracts/Vote.sol/Vote.json';

export default function Init({ setSet, setGet, setProvider }) {
  const [state, setState] = useState(0)
  const [bool, setBool] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
  let address

  provider.on("network", (newNetwork, oldNetwork) => {
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    if (oldNetwork) {
      setState(state + 1)
    }
  });

  //initialiser les constantes en fonction du réseau
  async function init() {
    try {
      const network = await provider._networkPromise
      const name = network.name

      if (name === "goerli") {
        address = "0x27A0bF8B26D7Caee8b783de380E7Cc6319E6BA11"
      }
      else if (name === "sepolia") {
        address = "0x4Aec1F50164e9B09EcD966495993a47fb0B80467"
      }

      const getContract = new ethers.Contract(address, Vote.abi, provider)
      const signer = provider.getSigner()
      const setContract = new ethers.Contract(address, Vote.abi, signer)
      setSet(setContract)
      setGet(getContract)
    }
    catch {
      console.log("Erreur d'initialisation")
    }
  }

  useEffect(() => {
    init()
    isConnected()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  //connecter metamask à l'aplication 
  async function connectDapp() {
    try {
      await provider.send("eth_requestAccounts", []);
      setBool(true)
    }
    catch {
      console.log("Erreur de connection à l'application")
    }
  }

  //vérifier la connexion metamask
  async function isConnected() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        console.log(`You're connected to: ${accounts[0]}`)
        setBool(true)
      } else {
        console.log("Metamask is not connected");
        setBool(false)
      }
    }
    catch {
      console.log("Erreur dans la vérification de connexion")
    }
  }

  return (
    <div>
      {!bool && <div><button onClick={connectDapp}>Connexion</button></div>}
    </div>
  )
}