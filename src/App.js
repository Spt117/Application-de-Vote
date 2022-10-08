import './App.css';
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Init from './Components/Init';

function App() {
  const [theData, setTheData] = useState();
  const [theNewData, setTheNewData] = useState();
  const [bool, setBool] = useState();
  const [get, setGet] = useState()
  const [set, setSet] = useState()
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  useEffect(() => {
    if (get) {
      isConnected()
      gData()
      // test()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get, set, bool])

  //récupérer le nom du réseau
  // async function test() {
  //   const letest = await provider._networkPromise
  //   const reseau = letest.name
  // }

  //connecter metamask à l'aplication 
  async function connectDapp() {
    await provider.send("eth_requestAccounts", []);
    setBool(true)
  }

  //récupérer la valeur de data (big number)
  async function gData() {
    const data = await get.getData()
    setTheData(data.toNumber())
  }

  //changer la valeur de data
  async function newData() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    const transaction = await set.setData(theNewData)
    await transaction.wait()
    gData()
  }

  //récupérer la valeur dans l'input
  function inputValue(e) {
    setTheNewData(e.target.value)
  }

  //vérifier la connexion metamask
  async function isConnected() {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      console.log(`You're connected to: ${accounts[0]}`)
      setBool(true)
    } else {
      console.log("Metamask is not connected");
      setBool(false)
    }
  }

  return (
    <div className="App">
      {!bool && <div><button onClick={connectDapp}>Connexion</button></div>}
      <h1>Data</h1>
      <div id='parent'>
        <div>
          <button onClick={gData}>Vérifier la valeur de Data</button>
          <p>Data est : {theData}</p>
        </div>
        <div>
          <button onClick={newData}>Envoyer une nouvelle valeur</button>
          <p> <input placeholder='Nouvelle valeur' onChange={inputValue}></input></p>
        </div>
      </div>
      <Init setSet={setSet} setGet={setGet} />
    </div>
  );
}

export default App;
