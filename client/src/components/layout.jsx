import { Link } from 'react-router-dom';
import '../style/layout.css';

const Layout = () => {
    return (
        <div className="layout">
            <h1 className="layout-title">TEAM 2 GAME SITE</h1>

            <nav className="navbar">
                <Link className="navbar-link" to="/">Home</Link>
                <Link className="navbar-link" to="/game-guide">Game Guide</Link>
                <Link className="navbar-link" to="/Character-Sheet">Character Sheet</Link>
                <Link className="navbar-link" to="/faq">Frequently Asked Questions</Link>
                <Link className="navbar-link" to="/register">Register</Link>
                <Link className="navbar-link" to="/login">Login</Link>
            </nav>
        </div>
    );
};

export default Layout;