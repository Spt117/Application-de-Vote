import { useEffect } from "react"
import IVote from "../../artifacts/contracts/IVote.sol/IVote.json"
import { ethers } from "ethers"

export default function Setcontrat({ contractVote, setStatut, setOwner }) {
   useEffect(() => {
      console.log(contractVote)
      init()
   })

   async function init() {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      try {
         const signer = provider.getSigner()
         const setTheContract = new ethers.Contract(contractVote, IVote.abi, signer)
         console.log(setTheContract)
         const owner = await setTheContract.owner()
         setOwner(owner)
      } catch {
         console.error("erreur")
      }
   }
}
