import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [apiResponse, setApiResponse] = useState({
    category_list: [],
    isLoading: true,
    error: undefined,
  });

  async function callAPI() {
    try {
      const response = await fetch('https://event-horizon.onrender.com/category', {
        mode: 'cors',
        credentials: 'include'
      });
      const res = await response.json();
      setApiResponse({
        latest_list: res.latest_list,
        category_list: res.category_list,
        isLoading: false,
        error: res.error,
      });
      return;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    callAPI();
  }, []);

  const categories = apiResponse.category_list.map((category, index) => {
    return (
      <div key={category._id}>
        <Link to={category.url} className="category-name">
          {category.category}
        </Link>
      </div>
    );
  });

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
      <div className="latest-page">
        <header>
          <h1 className="category-heading">Category List</h1>
        </header>
        <section className="category-list">{categories}</section>
      </div>
    );
  }
}

export default CategoryList;
