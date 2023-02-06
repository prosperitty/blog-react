import React, { useContext } from 'react';
// import horizon from '../horizon.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Nav() {
  const { isAuthenticated } = useContext(AuthContext);
  function displayLinks() {
    const navLinks = document.querySelectorAll('.nav-link-container');
    navLinks[0].classList.toggle('toggle-visibility');
    navLinks[1].classList.toggle('toggle-visibility');
  }

  if (!isAuthenticated) {
    return (
      <nav className="nav">
        <div className="nav-container">
          <div className="logo-container">
            <Link className="logo" to="/">
              Event Horizon
            </Link>
            {/* <img className="event-horizon" src={horizon} alt="event horizon" /> */}
            <div className="nav-handler" onClick={displayLinks}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </div>
          </div>
          <div className="toggle-visibility nav-link-container">
            <Link className="nav-link" to="blogs" onClick={displayLinks}>
              Latest
            </Link>
            <Link className="nav-link" to="category" onClick={displayLinks}>
              Categories
            </Link>
          </div>
          <div className="toggle-visibility nav-link-container">
            <Link className="nav-link" to="login" onClick={displayLinks}>
              Login
            </Link>
            <Link className="nav-link" to="signup" onClick={displayLinks}>
              Register
            </Link>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <div className="nav-container">
          <div className="logo-container">
            <Link className="logo" to="/">
              Event Horizon
            </Link>
            {/* <img className="event-horizon" src={horizon} alt="event horizon" /> */}
            <div className="nav-handler" onClick={displayLinks}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </div>
          </div>
          <div className="toggle-visibility nav-link-container">
            <Link className="nav-link" to="blogs" onClick={displayLinks}>
              Latest
            </Link>
            <Link className="nav-link" to="category" onClick={displayLinks}>
              Categories
            </Link>
            <Link className="nav-link" to="blogs/create" onClick={displayLinks}>
              New Article
            </Link>
            <Link
              className="nav-link"
              to="category/create"
              onClick={displayLinks}
            >
              New Category
            </Link>
          </div>
          <div className="toggle-visibility nav-link-container">
            <Link
              className="nav-link"
              to="users/profile"
              onClick={displayLinks}
            >
              Profile
            </Link>
            <Link className="nav-link" to="users/logout" onClick={displayLinks}>
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
