import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Init from './Components/Init';
import Dapp from './Components/Dapp';
import Compte from './Components/Compte';
// import Infura from './Components/Infura';
// import Sequence from './Components/Sequence';

function App() {
  const [addr, setAddress] = useState()
  const [id, setId] = useState()
  const [get, setGet] = useState()
  const [set, setSet] = useState()

  return (
    <div className="App">
      <div className='parent'>
        <div>
      <Init setSet={setSet} setGet={setGet} setAddress={setAddress} setId={setId} />
      <Compte addr={addr} id={id}/>
      </div>
      <Dapp get={get} set={set} />
      </div>
      {/* <Infura/> */}
      {/* <Sequence setGet={setGet} setSet={setSet}/> */}
    </div>
  ); 
}

export default App;