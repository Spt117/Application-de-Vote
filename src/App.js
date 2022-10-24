import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Init from './Components/Init';
import Dapp from './Components/Dapp';
import Compte from './Components/Compte';
import Owner from './Components/Owner';
import Propositions from './Components/Propositions';

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
        <div>
          <Compte addr={addr} id={id} owner={owner} set={set} get={get} setOwner={setOwner} statut={statut} />
          <Owner addr={addr} id={id} owner={owner} set={set} statut={statut} get={get} />
        </div>
        <div>
          <h6>Addresse du contrat :</h6>
          <p>{contract}</p>
          <p>Propriétaire du contrat : {owner}</p>
        </div>
      </div>
      <div>
        <div>
          <Init contract={contract} id={id} setVoter={setVoter} set={set} addr={addr} setSet={setSet} setGet={setGet} setAddress={setAddress} setId={setId} setOwner={setOwner} owner={owner} setContract={setContract} setStatus={setStatus} get={get} setBlockTime={setBlockTime}/>
        </div>
        <Dapp id={id} voter={voter} get={get} set={set} owner={owner} setStatus={setStatus} statut={statut} addr={addr} />
      </div>
        <Propositions id={id} set={set} voter={voter} blockTime={blockTime} addr={addr}/>
    </div>
  );
}

export default App;