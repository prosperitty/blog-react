import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';

function Profile() {
  const [apiResponse, setApiResponse] = useState({ isLoading: true });

  useEffect(() => {
    fetch('/users/profile')
      .then((res) => res.json())
      .then((res) =>
        setApiResponse({
          isLoading: false,
          user: res.user,
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
  } else {
    return (
      <div className="App">
        <header className="">
          <p>jane doe</p>
          <ul>
            <li>Profile</li>
            <li>unpublished articles</li>
            <li>published articles</li>
          </ul>
        </header>
        <main>dynamic content</main>
      </div>
    );
  }
}

export default Profile;
