import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';

const Vote = ({vote}) => {

    const [option, setOption] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    async function getOption() {
        const data = await vote.getOption(id);
        const optionData = {
        id: Number(data[0]),
        name: data[1],
        voteCount: Number(data[2])
        };
        setOption(optionData);
    }

    async function voting() {
        try {
            const votingTx = await vote.vote(id);
            await votingTx.wait();
            navigate('/');
        } catch (error) {
            if (error && error.message && error.message.includes("Vous ne pouvez plus voter")) {
                setErrorMessage("Vous ne pouvez plus voter");
            } else {
                setErrorMessage("Une erreur inconnue est survenue");
            }
        }
    }
    

    useEffect(() => {
        getOption();
    },[]);

    return (
        <div className="vote-container">
            <div className="vote-option">
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="option-container">
                    <div className="option-title">Votre choix : {option.name}</div>
                    <div className="vote-count">Nombre de votes actuel : {option.voteCount}</div>
                    <button className="vote-button" onClick={() => voting()}>Votez maintenant</button>
                </div>
            </div>
        </div>
    );
  }
  export default Vote;