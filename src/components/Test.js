import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';

function Test() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch('/login/jwt')
      .then((res) => res.json())
      .then((res) => setApiResponse(res))
      .catch((err) => err);
  }, [setApiResponse]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>Login</h1>
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

export default Test;
