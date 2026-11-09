import { Link } from "react-router-dom";

const Layout = ({ token, onSignOut }) => {
  return (
    <div>
      <h1>TEAM 2 GAME SITE</h1>
      <nav>
        <Link to="/">Home</Link> |<Link to="/game-guide">Game Guide</Link> |<Link to="/Character-Sheet">Character Sheet</Link> |
        <Link to="/faq">Frequently Asked Questions</Link>
        {!token ? (
          <>
            {" "}
            | <Link to="/register">Register</Link> |<Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <a
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                onSignOut();
              }}>
              | Sign out
            </a>
          </>
        )}
      </nav>
    </div>
  );
};

export default Layout;
