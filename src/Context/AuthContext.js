import React, { createContext, useState, useEffect } from 'react';
import Auth from './Auth';
import logo from '../logo.svg';
import '../App.css';

export const AuthContext = createContext();

function Authenticate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Auth.isAuthenticated()
    .then((data) => {
      console.log(data.isAuthenticated)
      setIsAuthenticated(data.isAuthenticated);
      setIsLoading(false);
    })
    .catch(err => err);
  }, []);

  if (isLoading) {
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
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export default Authenticate;
