import { Link } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <h1>TEAM 2 GAME SITE</h1>
            <nav>
                <Link to="/">Home</Link> {" "} |
                <Link to="/game-guide">Game Guide</Link> {" "} |
                <Link to="/Character-Sheet">Character Sheet</Link> {" "} |
                <Link to="/faq">Frequently Asked Questions</Link> |
                <Link to="/register">Register</Link> {" "} |
                <Link to="/login">Login</Link>
            </nav>
        </div>
    );
};

export default Layout;