import React, { useContext } from 'react';
import horizon from '../horizon.png'
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
            <img className="event-horizon" src={horizon} alt="event horizon" />
          </div>
          <div>
            <Link className="nav-link" to="blogs">
              Latest
            </Link>
            <Link className="nav-link" to="category">
              Categories
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
            <img className="event-horizon" src={horizon} alt="event horizon" />
          </div>
          <div>
            <Link className="nav-link" to="blogs">
              Latest
            </Link>
            <Link className="nav-link" to="category">
              Categories
            </Link>
            <Link className="nav-link" to="blogs/create">
              New Article
            </Link>
            <Link className="nav-link" to="category/create">
              New Category
            </Link>
          </div>
          <div>
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
