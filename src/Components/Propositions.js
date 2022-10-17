import { useEffect } from "react";


export default function Propositions({ get }) {
    let proposalArray

    useEffect(() => {
        if (get)
            récupérerPropositions()
    }, [get])

    async function récupérerPropositions() {
        const event = await get.queryFilter("ProposalRegistered", 0)
        console.log(event.length)
        for (let i = 0; i < event.length; i++) {
            const propositions = await get.getOneProposal(i)
            proposalArray.push(
                {
                    id: i,
                    desc: propositions.description,
                    voteCount: propositions.voteCount
                }
            )
        }
        console.log(proposalArray)
    }
}