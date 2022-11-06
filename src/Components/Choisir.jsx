import { useState } from "react"

export default function Choisir({ contract, setContractVote, setIdContractVote }) {
   const [div, setDiv] = useState(false)
   const [idContrat, setIdContrat] = useState()

   async function buyContract(bool) {
      try {
         const transaction = await contract.createVote(bool)
         await transaction.wait()
         const event = await contract.queryFilter("newContract", "latest" - 10, "latest")
         setContractVote(event[event.length - 1].args[0])
         setIdContractVote(event[event.length - 1].args[1].toNumber())
      } catch {
         console.error("échec")
      }
   }

   async function getContract() {
      try {
         setIdContractVote(idContrat)
         const myContract = await contract.Contrats(idContrat)
         setContractVote(myContract)
      } catch {
         console.error("échec")
      }
   }

   function active() {
      setDiv(true)
      document.querySelector("#c").style.display = "none"
   }

   return (
      <div className="child">
         {div && (
            <div id="theBool">
               <button onClick={() => buyContract(true)}>Propositions élargies</button>
               <button onClick={() => buyContract(false)}>Propositions restreintes</button>
            </div>
         )}
         <div id="c">
            <h4>Que souhaitez vous faire ? </h4>
            <br />
            <button className="buttonApp" onClick={active}>
               Acheter un contrat de vote
            </button>
            <br />
            <button className="buttonApp" onClick={getContract}>
               Me connecter à un contrat
            </button>
            <input placeholder="Id" onChange={(e) => setIdContrat(e.target.value)} />
         </div>
      </div>
   )
}
