import { useEffect, useState } from "react";

export default function Propositions({ set, voter, blockTime }) {
    const [proposalArray, setProposalArray] = useState()

    useEffect(() => {
        if (voter === true) {
            console.log(blockTime.toString())
            récupérerPropositions()
        }

        // eslint-disable-next-line
    }, [])

    async function récupérerPropositions() {
        let proposals = [];
        const event = await set.queryFilter("ProposalRegistered", blockTime, "latest")
        try {
            for (let i = 0; i < event.length; i++) {
                const propositions = await set.getOneProposal(i)
                proposals.push(propositions)
            }
        }
        catch { console.log("Erreur") }
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
    if (proposalArray)
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
                                <td>{index}</td>
                                <td>{propo[0]}</td>
                                <td>{propo[1].toNumber()}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        )

}