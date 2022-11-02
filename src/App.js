import Theapp from "./Components/Theapp"

export default function App() {
    return (
        <div>
            <header>
                <div>
                    <h2>Bienvenu sur notre plateforme de vote en ligne !</h2>
                    {!window.ethereum && <div id='walletmanquant'>
                        <h2>Impossible de trouver votre walet !</h2>
                        <p>Metamask n'est pas détecté sur votre navigateur, <a href='https://metamask.io/'>veuillez installer l'extension !</a></p>
                    </div>}
                </div>
            </header>
            <Theapp/>
        </div>
    )
}