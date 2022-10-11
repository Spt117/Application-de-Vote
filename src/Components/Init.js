import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Vote from '../../src/artifacts/contracts/Vote.sol/Vote.json';
import Spinner from 'react-bootstrap/Spinner';

export default function Init({ setSet, setGet }) {
  const [bool, setBool] = useState();
  const [loader, setLoader] = useState();
  let address

  useEffect(() => {
    if (window.ethereum) {
      init()
      isConnected()
      network()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //détecter les changements de réseau et MAJ des constantes
  function network() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    //relancer init en cas de changement de réseau
    provider.on("network", (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        init()
        network()
      }
    });
  }

  //initialiser les constantes en fonction du réseau
  async function init() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      const network = await provider._networkPromise
      const id = network.chainId

      if (id === 5) {
        address = "0x534F9541610BC6236D6CC22180EE37F283A06C18"
      }
      else if (id === 11155111) {
        address = "0x9a8Bc42F255E1BC214c9f0D8c383CD5A785Ef390"
      }

      const getContract = new ethers.Contract(address, Vote.abi, provider)
      const signer = provider.getSigner()
      const setContract = new ethers.Contract(address, Vote.abi, signer)
      setSet(setContract)
      setGet(getContract)
    }
    catch {
      console.log("Erreur d'initialisation : le contrat n'est pas déployé sur ce réseau !")
    }
  }

  //connecter metamask à l'aplication 
  async function connectDapp() {
    setLoader(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      await provider.send("eth_requestAccounts", []);
      setBool(true)
    }
    catch {
      console.log("Erreur de connection à l'application")
    }
    finally {
      setLoader(false)
    }
  }

  //vérifier la connexion metamask et agir sur le bouton de connexion à l'application
  async function isConnected() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setBool(true)
      } else {
        setBool(false)
      }
    }
    catch {
      console.log("Erreur dans la vérification de connexion")
    }
  }

  return (
    <div>
      {!bool && window.ethereum && <div><button onClick={connectDapp}>Connexion {loader && <Spinner animation="border" role="status" size="sm" />}</button></div>}
    </div>
  )
}