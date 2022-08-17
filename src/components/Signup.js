import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Navigate } from 'react-router-dom';

function Signup() {
  const [apiResponse, setApiResponse] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  useEffect(() => {
    fetch('signup')
      .then((res) => res.json())
      .then((res) =>
        setApiResponse({
          isLoading: false,
          isLoggedIn: res.isLoggedIn,
        })
      )
      .catch((err) => err);
  }, [setApiResponse]);

  if (apiResponse.isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  } else if (apiResponse.isLoggedIn) {
    return <Navigate to="/blogs" replace="true" />;
  } else {
    return (
      <div className="App">
        <h1>Sign Up</h1>
        <form action="" method="POST">
          <label htmlFor="firstname">First Name</label>
          <input name="firstname" placeholder="first name" type="text" />
          <label htmlFor="lastname">Last Name</label>
          <input name="lastname" placeholder="last name" type="text" />
          <label htmlFor="username">Username</label>
          <input name="username" placeholder="username" type="email" />
          <label htmlFor="password">Password</label>
          <input name="password" placeholder="password" type="password" />
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
