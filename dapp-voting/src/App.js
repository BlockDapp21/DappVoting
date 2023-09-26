import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './pages/Navbar';
import Home from './pages/Home.js';
import Vote from './pages/Vote.js';
import { useState, useEffect } from 'react';
import VOTE from './artifacts/contracts/Vote.sol/Vote.json';
import { ethers } from "ethers";

const VOTEAddress = process.env.REACT_APP_VOTE_ADDRESS;

function App() {

  const [account, setAccount] = useState(null);
  const [vote, setVote] = useState({}); //{}= objet vide
  const [loading, setLoading] = useState(true);

  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const vote = new ethers.Contract(VOTEAddress, VOTE.abi, signer);
    setVote(vote);
    setLoading(false);
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
          <Navbar account={account} setAccount={setAccount} />
        <div>
        {loading ? (
            <div>Loading...</div>
          ) : (
          <Routes>
            <Route path="/" element={
              <Home vote={vote} />
            } /> 
            <Route path="/vote/:id" element={
              <Vote vote={vote} />
            } /> 
          </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
