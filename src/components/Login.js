import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Navigate } from 'react-router-dom';

function Login() {
  const [apiResponse, setApiResponse] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  useEffect(() => {
    fetch('https://event-horizon.onrender.com/login', {
      mode: 'cors',
      credentials: 'include'
    })
      .then((res) => res.json())
      //remove req.user object
      .then((res) =>
        setApiResponse({
          isLoading: false,
          isLoggedIn: res.isLoggedIn,
        })
      )
      .catch((err) => err);
  }, []);

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
    console.log(apiResponse);
    return <Navigate to="/blogs" replace="true" />;
  } else {
    console.log(apiResponse);
    return (
      <div className="register-page">
        <h1 className="register-heading">Login</h1>
        <form action="https://event-horizon.onrender.com/login" method="POST" className="register-container">
          <label htmlFor="username">Username</label>
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
          <button className="register-button">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
