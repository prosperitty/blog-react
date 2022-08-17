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
    fetch('login')
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
    return <Navigate to="/blogs" replace="true" />;
  } else {
    console.log(apiResponse);
    return (
      <div className="App">
        <form action="" method="POST">
          <label htmlFor="username">Username</label>
          <input name="username" placeholder="username" type="email" />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
          <button>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
