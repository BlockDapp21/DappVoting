import { Link } from "react-router-dom";
import { ethers } from 'ethers'

const Navbar= ({ account, setAccount }) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
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