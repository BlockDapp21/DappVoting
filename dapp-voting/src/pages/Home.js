import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


const Home = ({vote}) => {

    const [options, setOptions] = useState([]);

    const navigate = useNavigate();

    const getOptions = async() => {
        const data = await vote.getOptions();
        const newOptions = [];
        for (let i = 0; i < data.length; i++) {
            newOptions.push({
                id: Number(data[i][0]),
                name: String(data[i][1]),
                voteCount: Number(data[i][2])
            });
        }
        setOptions(newOptions);
    } 

    useEffect(() => {
        getOptions();
      }, [])

    const goToVote = (id)=>{
      navigate(`/vote/${id}`)
    }

    return (
        <div className="app">
            <div className="title-container">
                <h1>Faîtes votre choix</h1>
            </div>
            <div className="app-container">
                {options.map(option => (
                    <div key={option.id} className="option">
                        <p>{option.name}</p>
                        <button onClick={() => goToVote(option.id)}>Cliquez pour voter</button>
                    </div>
                ))}
            </div>
        </div>
    );
  }
  export default Home;