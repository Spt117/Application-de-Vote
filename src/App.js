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

  return (
    <div className="App">
      <div className='parent'>
        <div>
          <Init setSet={setSet} setGet={setGet} setAddress={setAddress} setId={setId} setOwner={setOwner} owner={owner} setContract={setContract} setStatus={setStatus} get={get} />
          <Compte addr={addr} id={id} owner={owner} set={set} get={get} setOwner={setOwner} statut={statut} />
          <Owner addr={addr} id={id} owner={owner} set={set} statut={statut} get={get} />
        </div>
        <Dapp get={get} set={set} owner={owner} setStatus={setStatus} statut={statut} />
        <Propositions get={get}/>
      </div>
      <h6>Addresse du contrat :</h6>
      <p>{contract}</p>
      <p>Propriétaire du contrat : {owner}</p>
    </div>
  );
}

export default App;