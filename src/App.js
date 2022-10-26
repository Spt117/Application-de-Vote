import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Init from './Components/Init';
import Dapp from './Components/Dapp';
import Compte from './Components/Compte';
import Propositions from './Components/Propositions';
import Statuts from './Components/Statuts';

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

  return (
    <div className="App">
      <div className='parent' id='one'>
        <Compte contract={contract} addr={addr} id={id} owner={owner} set={set} get={get} setOwner={setOwner} statut={statut} voter={voter} />
      </div>
      <Init contract={contract} id={id} setVoter={setVoter} set={set} addr={addr} setSet={setSet} setGet={setGet} setAddress={setAddress} setId={setId} setOwner={setOwner} owner={owner} setContract={setContract} setStatus={setStatus} get={get} setBlockTime={setBlockTime} />
      <div className='test'>
        <Statuts statut={statut}></Statuts>
        <Dapp id={id} voter={voter} get={get} set={set} owner={owner} setStatus={setStatus} statut={statut} addr={addr} />
      </div>
      <Propositions set={set} voter={voter} blockTime={blockTime} addr={addr} contract={contract} />
    </div>
  );
}

export default App;