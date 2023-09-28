import { Link } from "react-router-dom";
import { ethers } from 'ethers'

const Navbar = ({ account, setAccount, setVote, VOTEAddress, VOTE }) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accountAddress = ethers.utils.getAddress(accounts[0]);
        setAccount(accountAddress);

        // Reconnect with a signer after setting account.
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const voteContractWithSigner = new ethers.Contract(VOTEAddress, VOTE.abi, signer);
        setVote(voteContractWithSigner);
    }

    return (
        <div className="App">
            <nav className="navbar">
                <img className='logo' src='/logovote.jpg' />
                <div>
                    <Link as={Link} to="/" className="nav-item">Accueil</Link>
                    {account ? ( 
                        <button type="button" className='nav-connect'>
                            {account.slice(0, 6) + '...' + account.slice(38, 42)}
                        </button>
                    ) : ( 
                        <button type="button" className='nav-connect' onClick={connectHandler}>
                            Connexion
                        </button>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
