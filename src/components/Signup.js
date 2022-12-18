import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Navigate } from 'react-router-dom';

function Signup() {
  const [apiResponse, setApiResponse] = useState({
    message: '',
    isLoading: true,
    isValid: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    fetch('https://eventhorizon.up.railway.app/signup', {
      mode: 'cors',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((res) =>
        setApiResponse({
          message: res.message,
          isLoading: false,
          isValid: res.isValid,
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
  } else if (apiResponse.isValid) {
    return <Navigate to="/login" replace="true" />;
  } else {
    return (
      <div className="register-page">
        <h1 className="register-heading">Sign Up</h1>
        <p className='error message'>{apiResponse.message}</p>
        <form action="https://eventhorizon.up.railway.app/signup" method="POST" className="register-container">
          <label htmlFor="firstname">First Name</label>
          <input
            className="register-input"
            name="firstname"
            placeholder="first name"
            type="text"
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            className="register-input"
            name="lastname"
            placeholder="last name"
            type="text"
          />
          <label htmlFor="email">email</label>
          <input
            className="register-input"
            name="email"
            placeholder="email"
            type="email"
          />
          <label htmlFor="username">username</label>
          <input
            className="register-input"
            name="username"
            placeholder="username"
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input
            className="register-input"
            name="password"
            placeholder="password"
            type="password"
          />
          <button className="register-button">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
