import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Vote from '../../src/artifacts/contracts/Vote.sol/Vote.json';
import Spinner from 'react-bootstrap/Spinner';

export default function Init({ setSet, setGet, setAddress, setId, setOwner, setContract, setStatus, get, owner }) {
  const [bool, setBool] = useState();
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (window.ethereum) {
      init()
      isConnected()
      network()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bool]);

  useEffect(() => {
    if(owner) {
        getStatut()
        eventStatut()
    }
    // eslint-disable-next-line
}, [eventStatut])

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

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const network = await provider._networkPromise
    const id = network.chainId
    setId(id)

    try {
      let address
      if (id === 5) {
        address = "0x79944efE7B1aab45ee259d877822C8De3dbBc113"
      }
      else if (id === 11155111) {
        address = "0xc687C190679742Fd42979066ca187d2F4b0Bca1A"
      }
      const getContract = new ethers.Contract(address, Vote.abi, provider)
      const signer = provider.getSigner()
      const setTheContract = new ethers.Contract(address, Vote.abi, signer)
      const owner = await getContract.owner()
      setOwner(owner)
      setSet(setTheContract)
      setGet(getContract)
      setContract(address)
      if (bool === true) {
        const signerAddress = await signer.getAddress()
        setAddress(signerAddress)
      }
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

  // récupération du statut en cours
  async function getStatut() {
    const statut = await get.workflowStatus()
    setStatus(statut)
  }

  // mise à jours du statut
  function eventStatut() {
    get.on("WorkflowStatusChange", (newStatus) => {
      setStatus(newStatus)
    })
  }

  return (
    <div>
      {!bool && window.ethereum &&
        <div>
          <button onClick={connectDapp}>Connexion {loader && <Spinner animation="border" role="status" size="sm" />}</button>
        </div>}

    </div>
  )
}