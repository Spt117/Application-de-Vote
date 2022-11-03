export default function Accueil() {
   return (
      <div>
         <header>
            <div>
               <h2>Bienvenu sur notre plateforme de vote en ligne !</h2>
               {!window.ethereum && (
                  <div id="walletmanquant">
                     <h2>Impossible de trouver votre walet !</h2>
                     <p>
                        Metamask n'est pas détecté sur votre navigateur, <a href="https://metamask.io/">veuillez installer l'extension !</a>
                     </p>
                  </div>
               )}
            </div>
            <div id="présentation">
               <h3>Présentation de notre application de vote en ligne</h3>
               <p> Vous avez la possibilité de tester notre plateforme gratuitement !</p>
            </div>
         </header>
      </div>
   )
}
