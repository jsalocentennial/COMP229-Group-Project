import { Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <h1>TEAM 2 GAME SITE</h1>
            <nav>
                <Link to="/">Home</Link> {" "} |
                <Link to="/leader-board">Leader Board</Link> {" "} | 
                <Link to="/game-guide">Game Guide</Link> {" "} |
                <Link to="/challenge-creater">Challenge Creater</Link> {" "} |
                <Link to="/faq">Frequently Asked Questions</Link>
            </nav>
        </div>
    );
};

export default Layout;