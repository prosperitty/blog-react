import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Nav() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <nav className="nav">
        <div className="nav-container">
          <div>
            <Link className="logo" to="/">
              Event Horizon
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="category">
              Latest
            </Link>
            <Link className="nav-link" to="category">
              Politics
            </Link>
            <Link className="nav-link" to="category">
              Business
            </Link>
            <Link className="nav-link" to="category">
              Technology
            </Link>
            <Link className="nav-link" to="category">
              Science
            </Link>
            <Link className="nav-link" to="category">
              Health
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="login">
              Login
            </Link>
            <Link className="nav-link" to="signup">
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
          <div>
            <Link className="logo" to="/">
              Event Horizon
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="category">
              Latest
            </Link>
            <Link className="nav-link" to="category">
              Politics
            </Link>
            <Link className="nav-link" to="category">
              Business
            </Link>
            <Link className="nav-link" to="category">
              Technology
            </Link>
            <Link className="nav-link" to="category">
              Science
            </Link>
            <Link className="nav-link" to="category">
              Health
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="blogs/create">
              New Article
            </Link>
            <Link className="nav-link" to="users/profile">
              Profile
            </Link>
            <Link className="nav-link" to="users/logout">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
