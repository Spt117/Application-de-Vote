import Nowallet from "../Components/Nowallet"
import Choisir from "../Components/Choisir"
import Connexion from "../Components/Connexion"
import Infos from "../Components/Infos"
import { useState } from "react"

export default function Application() {
   const [connect, isConnect] = useState(false)
   const [contract, setTheContract] = useState()
   const [addr, setAddr] = useState()
   const [id, setId] = useState()
   const [contractVote, setContractVote] = useState()
   const [idContractVote, setIdContractVote] = useState()

   return (
      <div>
         <Nowallet />
         <Connexion setId={setId} setAddr={setAddr} connect={connect} isConnect={isConnect} setTheContract={setTheContract}></Connexion>
         {connect && (
            <div className="parent">
               <Infos addr={addr} id={id} contractVote={contractVote} idContractVote={idContractVote} />
               {contractVote === undefined && <Choisir setIdContractVote={setIdContractVote} contract={contract} setContractVote={setContractVote} />}
            </div>
         )}
      </div>
   )
}
