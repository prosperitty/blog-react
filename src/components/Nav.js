import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Nav() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <nav className="nav">
        <div className="logo">Blog</div>
        <div>
          <Link className="nav-link" to="/">
            home
          </Link>
          <Link className="nav-link" to="blogs">
            blogs
          </Link>
          <Link className="nav-link" to="login">
            login
          </Link>
          <Link className="nav-link" to="signup">
            signup
          </Link>
          <Link className="nav-link" to="blogs/create">
            new article
          </Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <div className="logo">Blog</div>
        <div>
          <Link className="nav-link" to="/">
            home
          </Link>
          <Link className="nav-link" to="blogs">
            blogs
          </Link>
          <Link className="nav-link" to="blogs/create">
            new article
          </Link>
          <Link className="nav-link" to="users/profile">
            profile
          </Link>
        </div>
      </nav>
    );
  }
}

export default Nav;
