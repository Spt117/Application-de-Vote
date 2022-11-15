import { useEffect } from "react"
import { ethers } from "ethers"
import VoteFactory from "../../artifacts/contracts/VoteFactory.sol/VoteFactory.json"

export default function Connexion({ connect, setTheContract, isConnect, setAddr, setId }) {
   useEffect(() => {
      connectDapp()
      if (connect) init()
      // eslint-disable-next-line
   }, [connect])

   //connecter metamask à l'aplication
   async function connectDapp() {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
         await provider.send("eth_requestAccounts", [])
         isConnect(true)
      } catch {
         console.log("Erreur de connection à l'application")
      }
   }

   //initialiser les constantes en fonction du réseau
   async function init() {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      const network = await provider._networkPromise
      const id = network.chainId
      try {
         setId(id)
         let address
         if (id === 5) {
            address = "0xA3E06c748045F588bb090C0849Dca5B3BFe32B1e"
         } else if (id === 11155111) {
            address = "0xa3c4B2f4118C20fbFf67cDFCdAeC56Cd5171d8d6"
         }
         const signer = provider.getSigner()
         const contrat = new ethers.Contract(address, VoteFactory.abi, signer)
         setTheContract(contrat)
         if (connect === true) {
            const signerAddress = await signer.getAddress()
            setAddr(signerAddress)
         }
      } catch {
         console.log("Erreur d'initialisation : le contrat n'est pas déployé sur ce réseau !")
      }
   }
}
