export default function Infos({ id, addr, contractVote, idContractVote, voter }) {
   const truncate = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

   //formater l'adresse de connexion à afficher
   function truncateAddr(address) {
      const match = address.match(truncate)
      if (!match) return address
      return `${match[1]}…${match[2]}`
   }

   // récupérer le bon réseau de connecté
   function network() {
      if (id === 5) {
         return "Goerli"
      } else if (id === 11155111) {
         return "Sepolia"
      } else if (id === 1) return "Ethereum Mainnet"
   }
   if (addr)
      return (
         <div className="child">
            <h4>Informations de connexion</h4>
            <p>
               <b>Réseau : </b>
               {network(id)}
            </p>
            <p>
               <b>Addresse de connexion : </b>
               {truncateAddr(addr)}
            </p>
            {contractVote !== undefined && (
               <p id="contrat">
                  <b>Contrat : </b>
                  {contractVote}
                  <br />
                  <b> Identifiant :</b> {idContractVote}
               </p>
            )}
            {voter && <h6 className="enregistrement">Vous êtes enregistré pour cette session de vote !</h6>}
            {!voter && voter !== undefined && <h6 className="enregistrement">Vous n'êtes pas enregistré pour cette session de vote !</h6>}
         </div>
      )
}
