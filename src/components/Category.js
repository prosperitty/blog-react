import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../logo.svg';
import { Buffer } from 'buffer';
import '../App.css';
import { Link } from 'react-router-dom';

function Category() {
  const [apiResponse, setApiResponse] = useState({
    category_list: [],
    isLoading: true,
    error: undefined,
  });
  const [categoryId] = useState(useParams());

  async function callAPI() {
    try {
      const response = await fetch(`${categoryId.categoryId}`);
      const res = await response.json();
      setApiResponse({
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

  const posts = apiResponse.category_list.map((post, index) => {
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
        <header>
          header
        </header>
        <section>{posts}</section>
      </div>
    );
  }
}

export default Category;
