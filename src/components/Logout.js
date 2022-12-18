import { useEffect, useState, useContext } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Auth from '../Context/Auth';

function Logout() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [apiResponse, setApiResponse] = useState({
    isLoading: true
  });

  useEffect(() => {
    Auth.logout()
    .then((res) => {
      if (res.statusCode === 200) {
        setIsAuthenticated(res.isLoggedIn);
        setApiResponse({isLoading: false})
      }
    })
    .catch(err => err);
  }, [setIsAuthenticated]);

  if (apiResponse.isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Logging out...</p>
        </header>
      </div>
    );
  } else if (!isAuthenticated) {
    return <Navigate to="/login" replace="true" />;
  }
}

export default Logout;