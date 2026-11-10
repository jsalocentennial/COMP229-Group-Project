import '../style/layout.css';
import '../style/home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/character-sheet');
    };

    return (
        <>
            <div className="home-container">
                <h2 className="layout-title">Welcome to the Team 2 Game Site!</h2>
            </div>
            <div className="home-container">
                <h3 className="layout-title">Features:</h3>
                <ul className="feature-list">
                    <li className="listheader">Fully customizable character creator</li>
                    <li className="listitem">Choose between 3 different classes</li>
                    <li className="sublist">Fighter</li>
                    <img className="class-icon" src="src/assets/fighter_icon.png" alt="Fighter" />
                    <li className="sublist">Mage</li>
                    <img className="class-icon" src="src/assets/mage_icon.png" alt="Mage" />
                    <li className="sublist">Theif</li>
                    <img className="class-icon" src="src/assets/thief_icon.png" alt="Theif" />
                    <li className="listitem">Choose between 3 different races</li>
                    <li className="sublist">Human</li>
                    <img className="race-icon" src="src/assets/human.png" alt="Human" />
                    <li className="sublist">Elf</li> 
                    <img className="race-icon" src="src/assets/elf.png" alt="Elf" />
                    <li className="sublist">Orc</li>
                    <img className="race-icon" src="src/assets/orc.png" alt="Orc" />
                    <li className="listitem">Customizable experience and level system</li>
                    <li className="listitem">View or modify characters at will</li>
                    <li className="listitem">Delete characters you don't like</li>
                </ul>
            </div>
            <div className="home-container">
                <h3 className="layout-title">Getting Started:</h3>
                <p>Need help getting started? Check out our <a href="/game-guide">Game guide</a>!</p>
                <p>Or</p>
                <p>Ready to create your own unique character? Click the button below to start your journey!</p>
                <button className="btn-primary" onClick={handleClick}>Create Character</button>
            </div>
        </>
    );
};

export default Home;