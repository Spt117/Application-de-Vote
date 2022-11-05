import { useEffect, useState } from "react"
import Init from "../Components/Init"
import Dapp from "../Components/Dapp"
import Compte from "../Components/Compte"
import Propositions from "../Components/Propositions"
import Statuts from "../Components/Statuts"
import Alerte from "../Components/Alerte"

function Demo() {
   const [owner, setOwner] = useState()
   const [addr, setAddress] = useState()
   const [contract, setContract] = useState()
   const [id, setId] = useState()
   const [get, setGet] = useState()
   const [set, setSet] = useState()
   const [statut, setStatus] = useState()
   const [voter, setVoter] = useState()
   const [blockTime, setBlockTime] = useState()
   const [erreur, setErreur] = useState()
   const [winner, setWinner] = useState([])

   useEffect(() => {
      if (erreur) {
         sendErreur()
      }
      if (statut === 5) {
         getWinner()
      } else close()
      // eslint-disable-next-line
   }, [statut, erreur])

   function sendErreur() {
      let div = document.querySelector(".Animation")
      div.style.display = "block"
      setTimeout(() => {
         div.style.display = "none"
         setErreur()
      }, 5000)
   }

   async function getWinner() {
      const event = await set.queryFilter("GetWinning", blockTime, "latest")
      let propoGagnantes = event[event.length - 1].args[0].map((BN) => BN.toNumber())
      let array = []
      for (let i = 0; i < propoGagnantes.length; i++) {
         let propositions = await set.getOneProposal(propoGagnantes[i])
         array.push({
            id: propoGagnantes[i],
            proposition: propositions[0],
            votes: propositions[1].toNumber(),
         })
      }
      setWinner(array)
      let div = document.querySelector("#finvote")
      div.style.display = "block"
   }

   function close() {
      let divAlert = document.querySelector("#finvote")
      divAlert.style.display = "none"
   }

   return (
      <div>
         <div className="Animation">
            <p>{erreur}</p>
         </div>
         <div id="finvote">
            <div className="thebutton">
               <button className="close" onClick={close} title="Fermer">
                  X
               </button>
            </div>
            <h3>Résultat du vote</h3>
            <br />
            {winner.length === 1 && (
               <div className="winner">
                  <p>
                     La proposition qui a remporté le vote est la numéro {winner[0].id} :<br />"{winner[0].proposition}" avec {winner[0].votes} voix !
                  </p>
               </div>
            )}
            {winner.length > 1 && (
               <div className="winner">
                  <h6>Il y a eu une égalité entre les propositions suivantes : </h6>
                  <ul id="proposgagantes">
                     {winner.map((propo, index) => (
                        <li key={index}>
                           La proposition numéro {propo.id} : "{propo.proposition}"
                        </li>
                     ))}
                  </ul>
                  <h6>Le deuxième tour aura lieu prochainement !</h6>
               </div>
            )}
         </div>
         <div className="App">
            <Alerte set={set} addr={addr} owner={owner} voter={voter}></Alerte>
            <div id="one">
               <Compte contract={contract} addr={addr} id={id} owner={owner} set={set} get={get} setOwner={setOwner} statut={statut} voter={voter} />
            </div>
            <Init statut={statut} contract={contract} id={id} setVoter={setVoter} set={set} addr={addr} setSet={setSet} setGet={setGet} setAddress={setAddress} setId={setId} setOwner={setOwner} owner={owner} setContract={setContract} setStatus={setStatus} get={get} setBlockTime={setBlockTime} />
            <div className="parent">
               <Statuts statut={statut}></Statuts>
               <div id="parentDapp">
                  <Dapp setErreur={setErreur} id={id} voter={voter} get={get} set={set} owner={owner} setStatus={setStatus} statut={statut} addr={addr} />
               </div>
            </div>
            <Propositions statut={statut} set={set} voter={voter} blockTime={blockTime} addr={addr} contract={contract} />
         </div>
      </div>
   )
}

export default Demo
