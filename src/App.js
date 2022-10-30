import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Init from './Components/Init';
import Dapp from './Components/Dapp';
import Compte from './Components/Compte';
import Propositions from './Components/Propositions';
import Statuts from './Components/Statuts';
import Alerte from './Components/Alerte';

function App() {
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

  useEffect(() => {
    if(erreur)
    sendErreur()
  },[erreur])

  function sendErreur() {
    let div = document.querySelector('.Animation')
    div.style.display = 'block';
    setTimeout(() => {
      div.style.display = 'none';
      setErreur()
    }, 5000)
  }


  return (
    <div>
      <div className='Animation'>{erreur}</div>
      {!window.ethereum && <div id='walletmanquant'>
        <h2>Impossible de trouver votre walet !</h2>
        <p>Metamask n'est pas détecté sur votre navigateur, <a href='https://metamask.io/'>veuillez installer l'extension !</a></p>
      </div>}
      <div className="App">
        <Alerte set={set} addr={addr} owner={owner} voter={voter}></Alerte>
        <div id='one'>
          <Compte contract={contract} addr={addr} id={id} owner={owner} set={set} get={get} setOwner={setOwner} statut={statut} voter={voter} />
        </div>
        <Init statut={statut} contract={contract} id={id} setVoter={setVoter} set={set} addr={addr} setSet={setSet} setGet={setGet} setAddress={setAddress} setId={setId} setOwner={setOwner} owner={owner} setContract={setContract} setStatus={setStatus} get={get} setBlockTime={setBlockTime} />
        <div className='test'>
          <Statuts statut={statut}></Statuts>
          <div>
            <Dapp setErreur={setErreur} id={id} voter={voter} get={get} set={set} owner={owner} setStatus={setStatus} statut={statut} addr={addr} />
          </div>
        </div>
        <Propositions set={set} voter={voter} blockTime={blockTime} addr={addr} contract={contract} />
      </div>
    </div>
  );
}

export default App;