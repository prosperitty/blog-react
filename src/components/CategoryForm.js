import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '../App.css';
import logo from '../logo.svg';
import  API_URL from '../config';

function CategoryForm() {
  const { isAuthenticated } = useContext(AuthContext);
  const [apiResponse, setApiResponse] = useState({isValid: false, message: ''});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    callAPI();
  }, []);

  function callAPI() {
    fetch(`${API_URL}/category/create`, {
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => setIsLoading(false))
      .catch((err) => err);
  }

  function submitCategory(event) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const jsonData = JSON.stringify(data);

    fetch(`${API_URL}/category/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((res) => {
        setApiResponse({
          message: res.message,
          isValid: res.isValid,
        })
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  } else if (apiResponse.isValid) {
    return <Navigate to="/category" replace="true" />;
  } else if (isAuthenticated) {
    return (
      <div className="register-page">
        <p className='error message'>{apiResponse.message}</p>
        <form
          className="register-container"
          action={`${API_URL}/category/create`}
          method="POST"
          onSubmit={submitCategory}
        >
          <label htmlFor="category">Category</label>
          <input
            className="register-input"
            type="text"
            placeholder="category"
            name="category"
            required
          />
          <button className="register-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="register-page">
        <form
          className="register-container"
          action={`${API_URL}/category/create`}
          method="POST"
        >
          <label htmlFor="category">Category</label>
          <input
            className="register-input"
            type="text"
            placeholder="must sign in to add a new category"
            name="category"
            disabled
          />
        </form>
      </div>
    );
  }
}

export default CategoryForm;
