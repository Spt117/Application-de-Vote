import { useEffect, useState } from "react"

export default function Propositions({ contract, set, voter, blockTime, statut }) {
   const [proposalArray, setProposalArray] = useState()

   useEffect(() => {
      if (voter === true && blockTime !== undefined) {
         récupérerPropositions()
      }
      // eslint-disable-next-line
   }, [contract, voter, blockTime, statut])

   async function récupérerPropositions() {
      let proposals = []
      const event = await set.queryFilter("ProposalRegistered", blockTime, "latest")
      const ids = event.map((pro) => pro.args[0])
      try {
         if (event.length !== 0)
            for (let i of ids) {
               const propositions = await set.getOneProposal(i)
               if (propositions[0] !== "") proposals.push({ id: i.toNumber(), desc: propositions })
            }
      } catch {
         console.log("Erreur")
      }
      setProposalArray(proposals)
      eventProposition()
      eventVote()
   }

   function eventProposition() {
      set.on("ProposalRegistered", (description, voteCount) => {
         récupérerPropositions()
      })
   }

   function eventVote() {
      set.on("Voted", (adresseVoter, vote) => {
         récupérerPropositions()
      })
   }

   // eslint-disable-next-line
   if (proposalArray && voter === true)
      if (proposalArray.length > 0)
         return (
            <div className="parentTableau">
               <table id="tableau">
                  <thead>
                     {/* <caption>Tableau des propositions</caption> */}
                     <tr>
                        <th>Numéro de la proposition</th>
                        <th>Description de la proposition</th>
                        <th>Nombre de voix</th>
                     </tr>
                  </thead>
                  <tbody>
                     {proposalArray.map((propo, index) => (
                        <tr key={index}>
                           <td>{propo.id}</td>
                           <td>{propo.desc[0]}</td>
                           <td>{propo.desc[1].toNumber()}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )
}
