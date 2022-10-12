import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from "react";
// import Init from './Components/Init';
// import Dapp from './Components/Dapp';
// import Infura from './Components/Infura';
import Sequence from './Components/Sequence';

function App() {
  // const [get, setGet] = useState()
  // const [set, setSet] = useState()

  return (
    <div className="App">
      {/* <Init setSet={setSet} setGet={setGet} /> */}
      {/* <Dapp get={get} set={set} /> */}
      {/* <Infura/> */}
      <Sequence />
    </div>
  ); 
}

export default App;