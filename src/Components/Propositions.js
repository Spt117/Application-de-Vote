import { useEffect, useState } from "react";


export default function Propositions({ set }) {
    let [proposalArray, setProposalArray] = useState()
    // let proposalArray = []



    useEffect(() => {
        if (set)
            récupérerPropositions()
            // eslint-disable-next-line
    }, [set])

    async function récupérerPropositions() {
        let proposals = [];
        const event = await set.queryFilter("ProposalRegistered", 0)
        for (let i = 0; i < event.length; i++) {
            const propositions = await set.getOneProposal(i)
            proposals.push(propositions)
        }
        setProposalArray(proposals)
        eventProposition()
    }

    function eventProposition() {
        set.on("ProposalRegistered", async (description, voteCount) => {
            récupérerPropositions()
          })
    }
    
// eslint-disable-next-line
    if(!proposalArray == 0)
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Proposals Description</th>
                        <th>VoteCount</th>
                    </tr>
                </thead>
                <tbody>
                    {proposalArray.map((propo, index) => (
                        <tr key={index}>
                            <td>{propo[0]}</td>
                            <td>{propo[1].toNumber()}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <hr />
        </div>
    )

}