import { useEffect, useState } from "react"


export default function Alerte({ addr, voter, owner, set }) {
    const [message, setMessage] = useState()
    const Messages = ["Votre adresse vient d'être enregistrée !", "Nouvelle adresse enregistrée.",
        "Nouvelle proposition enregistrée !", "Changement de statut effectué !"]

    useEffect(() => {
        if (set && (voter || addr === owner)) {
            console.log(12)
            eventStatut()
            eventEnregistrement()
            eventProposition()
            eventVote()
        }
        // eslint-disable-next-line
    }, [voter])

    function eventProposition() {
        set.on("ProposalRegistered", (description, voteCount) => {
            notif(Messages[2])
            console.log(1)
        })
    }

    function eventEnregistrement() {
        set.on("VoterRegistered", (adresse) => {
            if (addr === adresse) {
                notif(Messages[0])
            }
            else {
                notif(Messages[1])
            }
        })
    }

    function eventVote(){
        set.on("Voted", (adresse, id) => {
            notif("Nouveau vote de l'adresse " + adresse + " pour la proposition numéro " + id + " !")
        })
    }

    function eventStatut () {
        set.on("WorkflowStatusChange", (statut) => {
            notif(Messages[3])
            console.log(2)
        })
    }

    let divAlert = document.querySelector('#alert')
    function notif(msg) {
        setMessage(msg)
        divAlert.style.display = 'block';
        setTimeout(() => {
            divAlert.style.display = 'none';
        }, 10000)
    }
    function close() {
        divAlert.style.display = 'none';
    }

    return (
        <div>
            <div className="message" id="alert">
                <button id="close" onClick={close} title="Fermer">X</button>
                {message}
            </div>
        </div>
    )
}