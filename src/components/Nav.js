import { Link } from 'react-router-dom';

function Nav() {
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
      </div>
    </nav>
  );
}

export default Nav;