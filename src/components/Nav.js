import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Nav() {
  const { isAuthenticated } = useContext(AuthContext);
  function displayLinks() {
    const navLinks = document.querySelectorAll('.nav-link-container');
    navLinks[0].classList.toggle('toggle-visibility');
    navLinks[1].classList.toggle('toggle-visibility');
  }

  useEffect(() => {
    console.log(isAuthenticated, 'nav check');
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <nav className='nav'>
        <div className='nav-container'>
          <div className='logo-container'>
            <Link className='logo' to='/'>
              <svg
                version='1.0'
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 46.000000 54.000000'
                preserveAspectRatio='xMidYMid meet'
              >
                {' '}
                <g
                  transform='translate(0.000000,54.000000) scale(0.100000,-0.100000)'
                  fill='#000000'
                  stroke='none'
                >
                  {' '}
                  <path d='M270 430 c-19 -11 -48 -19 -65 -20 -62 -1 -125 -63 -125 -124 0 -13 -10 -49 -21 -80 -19 -48 -20 -60 -9 -86 17 -42 50 -48 114 -21 28 11 65 21 81 21 60 0 125 67 125 128 0 18 9 50 20 72 22 44 26 100 8 118 -18 18 -88 14 -128 -8z m105 -21 c4 -6 4 -26 1 -44 l-7 -34 -37 37 c-24 23 -34 40 -28 44 16 11 64 9 71 -3z m-69 -63 c19 -19 34 -41 34 -50 0 -22 -125 -146 -147 -146 -40 1 -93 66 -93 113 0 36 23 81 52 101 13 9 43 16 71 16 42 0 54 -5 83 -34z m30 -134 c-14 -27 -71 -72 -92 -72 -5 0 16 25 46 55 29 30 56 53 58 51 2 -2 -3 -18 -12 -34z m-212 -48 c20 -20 34 -39 32 -42 -13 -12 -79 -6 -88 8 -9 14 4 70 16 70 2 0 20 -16 40 -36z' />{' '}
                  <path d='M168 333 c-33 -39 -28 -90 10 -119 68 -52 159 64 93 118 -29 23 -83 23 -103 1z m41 -39 c-16 -17 -26 -21 -33 -13 -8 7 -4 16 13 30 32 26 48 13 20 -17z m46 -44 c-19 -21 -50 -27 -60 -11 -3 5 4 13 15 16 12 4 26 18 33 32 11 25 11 25 21 4 7 -16 5 -26 -9 -41z' />{' '}
                </g>{' '}
              </svg>
            </Link>
            {/* <img className="event-horizon" src={horizon} alt="event horizon" /> */}
            <div className='nav-handler' onClick={displayLinks}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
                />
              </svg>
            </div>
          </div>
          <div className='toggle-visibility nav-link-container'>
            <Link className='nav-link' to='blogs' onClick={displayLinks}>
              Latest
            </Link>
            <Link className='nav-link' to='category' onClick={displayLinks}>
              Categories
            </Link>
          </div>
          <div className='toggle-visibility nav-link-container'>
            <Link className='nav-link' to='login' onClick={displayLinks}>
              Login
            </Link>
            <Link className='nav-link' to='signup' onClick={displayLinks}>
              Register
            </Link>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className='nav'>
        <div className='nav-container'>
          <div className='logo-container'>
            <Link className='logo' to='/'>
              <svg
                version='1.0'
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 46.000000 54.000000'
                preserveAspectRatio='xMidYMid meet'
              >
                {' '}
                <g
                  transform='translate(0.000000,54.000000) scale(0.100000,-0.100000)'
                  fill='#000000'
                  stroke='none'
                >
                  {' '}
                  <path d='M270 430 c-19 -11 -48 -19 -65 -20 -62 -1 -125 -63 -125 -124 0 -13 -10 -49 -21 -80 -19 -48 -20 -60 -9 -86 17 -42 50 -48 114 -21 28 11 65 21 81 21 60 0 125 67 125 128 0 18 9 50 20 72 22 44 26 100 8 118 -18 18 -88 14 -128 -8z m105 -21 c4 -6 4 -26 1 -44 l-7 -34 -37 37 c-24 23 -34 40 -28 44 16 11 64 9 71 -3z m-69 -63 c19 -19 34 -41 34 -50 0 -22 -125 -146 -147 -146 -40 1 -93 66 -93 113 0 36 23 81 52 101 13 9 43 16 71 16 42 0 54 -5 83 -34z m30 -134 c-14 -27 -71 -72 -92 -72 -5 0 16 25 46 55 29 30 56 53 58 51 2 -2 -3 -18 -12 -34z m-212 -48 c20 -20 34 -39 32 -42 -13 -12 -79 -6 -88 8 -9 14 4 70 16 70 2 0 20 -16 40 -36z' />{' '}
                  <path d='M168 333 c-33 -39 -28 -90 10 -119 68 -52 159 64 93 118 -29 23 -83 23 -103 1z m41 -39 c-16 -17 -26 -21 -33 -13 -8 7 -4 16 13 30 32 26 48 13 20 -17z m46 -44 c-19 -21 -50 -27 -60 -11 -3 5 4 13 15 16 12 4 26 18 33 32 11 25 11 25 21 4 7 -16 5 -26 -9 -41z' />{' '}
                </g>
              </svg>
            </Link>
            {/* <img className="event-horizon" src={horizon} alt="event horizon" /> */}
            <div className='nav-handler' onClick={displayLinks}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
                />
              </svg>
            </div>
          </div>
          <div className='toggle-visibility nav-link-container'>
            <Link className='nav-link' to='blogs' onClick={displayLinks}>
              Latest
            </Link>
            <Link className='nav-link' to='category' onClick={displayLinks}>
              Categories
            </Link>
            <Link className='nav-link' to='blogs/create' onClick={displayLinks}>
              New Article
            </Link>
            <Link
              className='nav-link'
              to='category/create'
              onClick={displayLinks}
            >
              New Category
            </Link>
          </div>
          <div className='toggle-visibility nav-link-container'>
            <Link
              className='nav-link'
              to='users/profile'
              onClick={displayLinks}
            >
              Profile
            </Link>
            <Link className='nav-link' to='users/logout' onClick={displayLinks}>
              Logout
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
