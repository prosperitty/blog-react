import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import { Buffer } from 'buffer';
import '../App.css';
import { Link } from 'react-router-dom';

function Latest() {
  const [apiResponse, setApiResponse] = useState({
    latest_list: [],
    category_list: [],
    isLoading: true,
    error: undefined,
  });

  async function callAPI() {
    try {
      const response = await fetch('category');
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

  const posts = apiResponse.latest_list.map((post, index) => {
    let buffer = new Buffer.from(post.image.data.data).toString('base64');
    let mimetype = post.image.contentType;
    return (
      <div key={post._id}>
        <h4>
          <Link className="nav-link" to={post.url}>
            {post.title}
          </Link>
        </h4>
        <p>{post.summary}</p>
        <p>{post.date}</p>
        <img alt="article" src={`data:${mimetype};base64,${buffer}`} />
      </div>
    );
  });

  const categories = apiResponse.category_list.map((category, index) => {
    return (
      <div key={category._id}>
        <Link to={category.url}>
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
      <div className="App">
        <header>header</header>
        <section>{posts}</section>
        <section>{categories}</section>
      </div>
    );
  }
}

export default Latest;
