import { ethers } from "ethers"
import { useEffect, useState } from "react"
import VoteDemo from "../../artifacts/contracts/VoteDemo.sol/VoteDemo.json"
import Spinner from "react-bootstrap/Spinner"

export default function Init({ statut, contract, setBlockTime, setVoter, set, addr, setSet, setGet, setAddress, setId, setOwner, setContract, setStatus, get, owner }) {
   const [bool, setBool] = useState()
   const [loader, setLoader] = useState()

   useEffect(() => {
      if (window.ethereum) {
         isConnected()
         if (bool) init()
         network()
         account()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [bool])

   useEffect(() => {
      if (addr) {
         getStatut()
         isVoter()
         getBlockTime()
         getNewVoter()
      }
      // eslint-disable-next-line
   }, [addr, contract, owner, statut])

   //détecter les changements de réseau et MAJ des constantes
   function network() {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      //relancer init en cas de changement de réseau
      provider.on("network", (newNetwork, oldNetwork) => {
         if (oldNetwork) {
            init()
         }
      })
   }

   //détecter les changements de comptes metamask
   function account() {
      window.ethereum.on("accountsChanged", (accounts) => {
         init()
         network()
         account()
      })
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
            address = "0x4d4E3e4f57a4E1269793a53E21bD0ef6cCA562fE"
         } else if (id === 11155111) {
            address = "0x9572fDb225755072ebb3775eE2F9615b6708B02a"
         }
         const getContract = new ethers.Contract(address, VoteDemo.abi, provider)
         const signer = provider.getSigner()
         const setTheContract = new ethers.Contract(address, VoteDemo.abi, signer)
         const owner = await getContract.owner()
         setOwner(owner)
         setSet(setTheContract)
         setGet(getContract)
         setContract(address)
         if (bool === true) {
            const signerAddress = await signer.getAddress()
            setAddress(signerAddress)
         }
      } catch {
         console.log("Erreur d'initialisation : le contrat n'est pas déployé sur ce réseau !")
      }
   }

   //connecter metamask à l'aplication
   async function connectDapp() {
      setLoader(true)
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
         await provider.send("eth_requestAccounts", [])
         setBool(true)
      } catch {
         console.log("Erreur de connection à l'application")
      } finally {
         setLoader(false)
      }
   }

   //vérifier la connexion metamask et agir sur le bouton de connexion à l'application
   async function isConnected() {
      try {
         const accounts = await window.ethereum.request({ method: "eth_accounts" })
         if (accounts.length) {
            setBool(true)
         } else {
            setBool(false)
         }
      } catch {
         console.log("Erreur dans la vérification de connexion")
      }
   }

   // récupération du statut en cours
   async function getStatut() {
      const statut = await get.workflowStatus()
      setStatus(statut)
      eventStatut()
   }

   // mise à jours du statut
   function eventStatut() {
      get.on("WorkflowStatusChange", (newStatus) => {
         getStatut()
      })
   }

   //détection des enregistrements
   function getNewVoter() {
      get.on("VoterRegistered", (voterAddress) => {
         isVoter()
      })
   }

   async function isVoter() {
      try {
         const getVoter = await set.getVoter(addr)
         setVoter(getVoter[0])
      } catch {
         setVoter(false)
      }
   }

   async function getBlockTime() {
      const block = await set.blockEvent()
      setBlockTime(block.toNumber())
   }

   return (
      <div id="connexion">
         {!bool && window.ethereum && (
            <div>
               <h3>Se connecter à l'application de vote !</h3>
               <button onClick={connectDapp}>Connexion {loader && <Spinner animation="border" role="status" size="sm" />}</button>
            </div>
         )}
      </div>
   )
}
