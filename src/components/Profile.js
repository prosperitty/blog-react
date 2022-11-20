import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

function Profile() {
  const [apiResponse, setApiResponse] = useState({
    unpublished_articles: [],
    published_articles: [],
    user: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [publishedPage, setpublishedPaged] = useState(false);
  const [unpublishedPage, setUnpublishedPaged] = useState(true);

  useEffect(() => {
    callAPI()
  }, []);

  function callAPI() {
    fetch('/users/profile')
      .then((res) => res.json())
      .then((res) => {
        setApiResponse({
          unpublished_articles: res.unpublished_articles,
          published_articles: res.published_articles,
          user: res.user,
        })
        setIsLoading(false);
      }
      )
      .catch((err) => err);
  }

  function togglePublishedPage() {
    if (unpublishedPage) {
      setpublishedPaged(true);
      setUnpublishedPaged(false);
    }
  }

  function toggleUnpublishedPage() {
    if (publishedPage) {
      setUnpublishedPaged(true);
      setpublishedPaged(false);
    }
  }

  const unpublishedPosts = apiResponse.unpublished_articles.map(
    (post, index) => {
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
    }
  );

  const publishedPosts = apiResponse.published_articles.map((post, index) => {
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

  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  } else if (unpublishedPage) {
    return (
      <div className="App">
        <header className="">
          <p>{apiResponse.user.firstName} {apiResponse.user.lastName}</p>
          <ul>
            <li>Profile</li>
            <li onClick={toggleUnpublishedPage}>unpublished articles</li>
            <li onClick={togglePublishedPage}>published articles</li>
          </ul>
        </header>
        {unpublishedPosts}
      </div>
    );
  } else if (publishedPage) {
    return (
      <div className="App">
        <header className="">
          <p>{apiResponse.user.firstName} {apiResponse.user.lastName}</p>
          <ul>
            <li>Profile</li>
            <li onClick={toggleUnpublishedPage}>unpublished articles</li>
            <li onClick={togglePublishedPage}>published articles</li>
          </ul>
        </header>
        {publishedPosts}
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="">
          <p>{apiResponse.user.firstName} {apiResponse.user.lastName}</p>
          <ul>
            <li>Profile</li>
            <li onClick={toggleUnpublishedPage}>unpublished articles</li>
            <li onClick={togglePublishedPage}>published articles</li>
          </ul>
        </header>
        <main>dynamic content</main>
      </div>
    );
  }
}

export default Profile;
