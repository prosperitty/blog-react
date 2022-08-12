import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';

function Profile() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch('/users/profile')
      .then((res) => res.json())
      .then((res) => setApiResponse(res))
      .catch((err) => err);
  }, []);

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
          Profile
        </a>
      </header>
    </div>
  );
}

export default Profile;
