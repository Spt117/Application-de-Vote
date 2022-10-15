import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Init from './Components/Init';
import Dapp from './Components/Dapp';
import Compte from './Components/Compte';

function App() {
  const [owner, setOwner] = useState()
  const [addr, setAddress] = useState()
  const [contract, setContract] = useState()
  const [id, setId] = useState()
  const [get, setGet] = useState()
  const [set, setSet] = useState()

  return (
    <div className="App">
      <div className='parent'>
        <div>
      <Init setSet={setSet} setGet={setGet} setAddress={setAddress} setId={setId} setOwner={setOwner} owner={owner} setContract={setContract}/>
      <Compte addr={addr} id={id} owner={owner} set={set} get={get} setOwner={setOwner}/>
      </div>
      <Dapp get={get} set={set} owner={owner} />
      </div>
      <h6>Addresse du contrat :</h6>
      <p>{contract}</p>
    </div>
  ); 
}

export default App;