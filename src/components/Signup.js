import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';

function Signup() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch("signup")
      .then(res => res.json())
      .then(res => setApiResponse(res))
      .catch(err => err);
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
        <p>{apiResponse.message}</p>
      </div>
    );
}

export default Signup;