// Imports regarding router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Import ethers
import { ethers } from "ethers"

// import all the contracts
import VoterAbi from "./frontend/contractsData/Voter.json"
import VoterAddress from "./frontend/contractsData/Voter-address.json"

// Import Files for Frontend
import  Navigation from "./frontend/components/Navbar";
import AddCitizen from './frontend/components/AddCitizen';
import AddParticipant from './frontend/components/AddParticipant';
import Vote from "./frontend/components/Vote"
import Home from './frontend/components/Home';

 
function App() {
  const [ loading, setLoading ] = useState(true)
  const [ account, setAccount ] = useState(null)
  const [ voter, setVoter ] = useState({});
  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[ 0 ])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[ 0 ])
      await web3Handler()
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const Voter = new ethers.Contract(VoterAddress.address, VoterAbi.abi, signer);
    setVoter(Voter)
    setLoading(false)
  }
  
  return (
    <BrowserRouter>
      <div>
        <Navigation web3Handler={web3Handler} account={account} />
      </div>
      <Routes>
        <Route path='/' element={<Home voter={voter} account={account}/>}/>
        <Route path="/admin/addcitizen" element={<AddCitizen voter={voter} account={account} />} />
        <Route path="/admin/addparticipant" element={<AddParticipant voter={voter} account={account} />} />
        <Route path="/vote" element={<Vote voter={voter} account={account} />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
