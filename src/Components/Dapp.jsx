import { useEffect } from "react"
import { useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"

export default function Dapp({ owner, set, addr, statut, voter, setErreur }) {
   const [loader, setLoader] = useState()
   const [loaderVote, setLoaderVote] = useState()
   const [proposition, setProposition] = useState("")
   const [vote, setVote] = useState()
   const [loaderRegister, setLoaderRegister] = useState()
   const [addrRegister, setAddrRegister] = useState()
   const [boolVoted, setBoolVoted] = useState(false)

   useEffect(() => {
      if (voter && statut === 1) setButtonPropo()
      if (statut === 3 || statut === 4 || statut === 5) hasVoted()
      // eslint-disable-next-line
   }, [registerVoter, statut, proposition, ajouterProposition])

   // enregister les électeurs
   async function registerVoter() {
      setLoaderRegister(true)
      try {
         const register = await set.getVoter(addrRegister)
         if (!register[0]) {
            const transaction = await set.addVoter(addrRegister)
            await transaction.wait()
         } else {
            setErreur("Cette adresse est déjà enregistrée !")
         }
      } catch {
         setErreur("L'enregistrement de cette adresse a échoué, vérifiez le format de l'adresse !")
      } finally {
         setLoaderRegister(false)
         document.querySelector("#inputRegisterVoter").value = ""
      }
   }

   async function ajouterProposition() {
      setLoader(true)
      try {
         const transaction = await set.addProposal(proposition)
         await transaction.wait()
         document.querySelector("#propo").value = ""
      } catch {
         setErreur("Echec de l'enregistrement !")
      } finally {
         setLoader(false)
         setProposition("")
      }
   }

   async function voted() {
      setLoaderVote(true)
      try {
         const transaction = await set.setVote(vote)
         await transaction.wait()
      } catch {
         setErreur("Votre vote a échoué, vérifiez que votre numéro de proposition soit valable.")
      } finally {
         setLoaderVote(false)
      }
   }

   async function hasVoted() {
      const register = await set.getVoter(addr)
      if (register[1]) {
         setBoolVoted(true)
         if (boolVoted) setVote(register[2].toNumber())
      } else setBoolVoted(false)
   }

   function setButtonPropo() {
      const button = document.querySelector("#buttonpropo")
      if (proposition === "") {
         button.disabled = true
      } else button.disabled = false
   }

   if ((statut === 0 && addr === owner && addr !== undefined) || ((statut === 1 || statut === 3 || statut === 4 || statut === 5) && voter))
      return (
         <div id="Dapp">
            <div id="divapp">
               {statut === 0 && owner === addr && (
                  <div>
                     <h6>Vous pouvez enregistrer les électeurs</h6>
                     <input id="inputRegisterVoter" placeholder="Adresse" onChange={(e) => setAddrRegister(e.target.value)}></input>
                     <button onClick={registerVoter}>Enregistrer {loaderRegister && <Spinner animation="border" role="status" size="sm" />}</button>
                  </div>
               )}
               {statut === 1 && (
                  <div>
                     <h5>Vous pouvez enregistrer votre proposition</h5>
                     <input id="propo" placeholder="Votre proposition" onChange={(e) => setProposition(e.target.value)}></input>
                     <button id="buttonpropo" onClick={ajouterProposition}>
                        Enregistrer {loader && <Spinner animation="border" role="status" size="sm" />}
                     </button>
                  </div>
               )}
               {(statut === 3 || statut === 4 || statut === 5) && (
                  <div id="divote">
                     {!boolVoted && statut === 3 && (
                        <div>
                           <h5>Vous pouvez voter !</h5>
                           <input placeholder="Numéro de la proposition" onChange={(e) => setVote(e.target.value)} />
                           <button className="buttons" onClick={voted}>
                              Voter {loaderVote && <Spinner animation="border" role="status" size="sm" />}
                           </button>
                        </div>
                     )}
                     {boolVoted && (
                        <div>
                           <h5>Merci de votre participation !</h5>
                           <p>Vous avez voté pour la proposition numéro {vote}</p>
                        </div>
                     )}
                     {!boolVoted && (statut === 4 || statut === 5) && (
                        <div>
                           <h5>Vous n'avez pas voté !</h5>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </div>
      )
   else if (!voter && addr)
      return (
         <div id="Dapp">
            <div>Vous n'êtes pas enregistré pour cette session de vote !</div>
         </div>
      )
}
