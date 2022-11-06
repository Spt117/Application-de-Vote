export default function Accueil() {
   return (
      <div>
         <header>
            <h3>Bienvenu sur notre plateforme de vote en ligne !</h3>
         </header>
         <div id="accueil">
            <div id="présentation" className="standard">
               <h5>Présentation de notre application :</h5>
               <br />
               <p className="présentationp">
                  <b>Vote Web 3.0</b> est un système de vote sécurisé et transparent qui utilise la technologie de la blockchain. Grâce à cette inovation, le processus de vote est ainsi à la fois plus simple, plus rapide et moins coûteux, tout en diminuant le risque de fraude.
                  <br />
                  <br />
                  De plus, chacun pourra suivre l'avancée de l'élection et contrôler le résultat.
               </p>
               <p className="présentationp">
                  Vous pouvez <b>tester gratuitement notre application</b>, elle est actuellement déployée en démo sur les testnets d'ETH, Goerli et Sepolia. Vous aurez besoin de l'extension <a href="https://metamask.io/">Metamask</a> sur votre navigateur et il vous faudra des GoerliEth ou des
                  SepoliaEth pour faire vos opérations.
               </p>
               <a href="/Demo" id="tester">
                  Essayer Gratuitement
               </a>
            </div>
            <div id="pro" className="standard">
               <h5>Vous souhaitez l'utiliser à des fins professionnelles ? </h5>
               <br></br>
               <p id="buisness"> Rendez-vous sur notre application et achetez un contrat de vote ! Pour seulement 50$, vous aurez votre propre contrat et un accès illimité à notre application. </p>
            </div>
         </div>
      </div>
   )
}
