import './App.css';
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Vote from '../src/artifacts/contracts/Vote.sol/Vote.json';

function App() {
  const [theData, setTheData] = useState();
  const [theNewData, setTheNewData] = useState();
  const [bool, setBool] = useState();
  const voteAddress = "0x27A0bF8B26D7Caee8b783de380E7Cc6319E6BA11"

  const provider = new ethers.providers.Web3Provider(window.ethereum)

  useEffect(() => {
    isConnected()
    gData()
    // console.log(window.ethereum)
    // console.log(provider)
    test()
  }, [bool])

  //récupérer le nom du réseau
  async function test() {
    const letest =  await provider._networkPromise
    const reseau = letest.name
    console.log(reseau)
  }

  //connecter metamask à l'aplication 
  async function connectDapp() {
    await provider.send("eth_requestAccounts", []);
    setBool(true)
  }

  //récupérer la valeur de data (big number)
  async function gData() {
    const contract = new ethers.Contract(voteAddress, Vote.abi, provider)
    const data = await contract.getData()
    setTheData(data.toNumber())
  }

  //changer la valeur de data
  async function newData() {
    await window.ethereum.request({method: 'eth_requestAccounts'})

    const signer = provider.getSigner();
    const contract = new ethers.Contract(voteAddress, Vote.abi, signer)
    const transaction = await contract.setData(theNewData)
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
      { !bool && <div><button onClick={connectDapp}>Connexion</button></div>}
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
    </div>
  );
}

export default App;
