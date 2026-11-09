import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../style/layout.css";

const Layout = ({ token, onSignOut }) => {
  const location = useLocation();


  return (
    <div className="layout">
      <h1 className="layout-title">TEAM 2 GAME SITE</h1>
      <nav className="navbar">
        <Link className="navbar-link" to="/">
          Home
        </Link>{" "}
        |
        <Link className="navbar-link" to="/game-guide">
          Game Guide
        </Link>{" "}
        |
        <Link className="navbar-link" to="/character-sheet">
          Character Sheet
        </Link>{" "}
        |
        <Link className="navbar-link" to="/faq">
          Frequently Asked Questions
        </Link>
        {!token ? (
          <>
            {" "}
            |{" "}
            <Link className="navbar-link" to="/register">
              Register
            </Link>{" "}
            |
            <Link className="navbar-link" to="/login" state={{from: location}}>
              Login
            </Link>
          </>
        ) : (
          <>
          |
            <Link
              className="navbar-link"
              to="/logout"
              onClick={(e) => {
                e.preventDefault();
                onSignOut();
              }}>
               Sign out
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Layout;
