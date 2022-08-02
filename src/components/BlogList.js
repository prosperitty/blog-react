import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import { Buffer } from 'buffer';
import '../App.css';

function BlogList() {
  const [apiResponse, setApiResponse] = useState({
    article_list: [],
    isLoading: true,
    // image: undefined,
    error: undefined,
  });

  async function callAPI() {
    try {
      const response = await fetch('/blogs');
      const res = await response.json();
      setApiResponse({
        article_list: res.article_list,
        isLoading: false,
        error: res.error,
      });
      return;
    } catch (err) {
      console.error(err);
    }

    // fetch('blogs')
    // .then((res) => res.json())
    // .then((res) => setApiResponse(res))
    // .catch((err) => err);
  }

  useEffect(() => {
    callAPI();
  }, []);

  const posts = apiResponse.article_list.map((post, index) => {
    let buffer = new Buffer.from(post.image.data.data).toString('base64');
    let mimetype = post.image.contentType
    return (
      <div key={index}>
        <h4>
          <a href={post.url}>{post.title}</a>
        </h4>
        <p>{post.summary}</p>
        <p>{post.date}</p>
        <img alt='article' src={`data:${mimetype};base64,${buffer}`} />
      </div>
    )
  });

  // src={`data:${post.image.contentType};base64, ${post.image.data.data.toString('base64')}`}

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <section>{posts}</section>
      </div>
    );
  }
}

export default BlogList;
