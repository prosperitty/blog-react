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
            <Link className="nav-link" to="category/633d2bd499336cb4c9381d17">
              Politics
            </Link>
            <Link className="nav-link" to="category/63433c0bf956b9ec2934ecdc">
              Business
            </Link>
            <Link className="nav-link" to="category/63433c30f956b9ec2934ecea">
              Technology
            </Link>
            <Link className="nav-link" to="category/63433c35f956b9ec2934ecf8">
              Science
            </Link>
            <Link className="nav-link" to="category/63433c39f956b9ec2934ed06">
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
            <Link className="nav-link" to="category/633d2bd499336cb4c9381d17">
              Politics
            </Link>
            <Link className="nav-link" to="category/63433c0bf956b9ec2934ecdc">
              Business
            </Link>
            <Link className="nav-link" to="category/63433c30f956b9ec2934ecea">
              Technology
            </Link>
            <Link className="nav-link" to="category/63433c35f956b9ec2934ecf8">
              Science
            </Link>
            <Link className="nav-link" to="category/63433c39f956b9ec2934ed06">
              Health
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="blogs/create">
              New Article
            </Link>
            <Link className="nav-link" to="category/create">
              New Category
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
