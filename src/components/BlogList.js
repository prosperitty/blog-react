import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import { Buffer } from 'buffer';
import '../App.css';
import { Link } from 'react-router-dom';

function BlogList() {
  const [apiResponse, setApiResponse] = useState({
    article_list: [],
    isLoading: true,
    error: undefined,
  });

  async function callAPI() {
    try {
      const response = await fetch('https://eventhorizon.up.railway.app/blogs', {
        mode: 'cors',
        credentials: 'include'
      });
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

  function displayLatestArticle(article) {
    let buffer = new Buffer.from(article.image.data.data).toString('base64');
    let mimetype = article.image.contentType;
    return (
      <div key={article._id} className="main-article">
        <div className="main-black-gradient">
          <img
            alt="article"
            className="main-image"
            src={`data:${mimetype};base64,${buffer}`}
          />
        </div>
        <div className="latest-header-article-container">
          <div className="latest-header-article-heading">
            <Link className="nav-link" to={article.url}>
              <h4>{article.title}</h4>
            </Link>
            <p className="article-date-user">
              {/* {article.date_formatted} */}
              <span className="article-user">By {article.user.username}</span>
              <span>&#8226;</span>
              <span className="article-date">{article.date_formatted}</span>
            </p>{' '}
          </div>
          <div className="latest-header-article-summary">
            <p className="">{article.summary}</p>
          </div>
        </div>
      </div>
    );
  }

  const posts = apiResponse.article_list.slice(1).map((post, index) => {
    // let buffer = new Buffer.from(post.image.data.data).toString('base64');
    // let mimetype = post.image.contentType;
    return (
      <div key={post._id}>
        {/* <img
          alt="article"
          className="latest-image"
          src={`data:${mimetype};base64,${buffer}`}
        /> */}
        <p className="latest-post-date">
          <span className="article-user">By {post.user.username}</span>
          <span>&#8226;</span>
          <span className="article-date">{post.date_formatted}</span>
        </p>
        <h4 className="latest-post-title">
          <Link className="nav-link latest-post-title" to={post.url}>
            {post.title}
          </Link>
        </h4>
        <div>
          <p className="latest-post-summary">{post.summary}</p>
        </div>
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
        <header className="latest-header">
          <h1>latest</h1>
          <p>Discover the latest articles from all categories</p>
          {displayLatestArticle(apiResponse.article_list[0])}
        </header>
        <hr></hr>
        <section className="latest-posts-container">
          <h1>latest posts</h1>
          <div className="latest-posts-grid">{posts}</div>
        </section>
      </div>
    );
  }
}

export default BlogList;
