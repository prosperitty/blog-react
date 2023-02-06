import { useEffect, useState } from 'react';
// import { Buffer } from 'buffer';
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
  const [profliePage, setProfilePage] = useState(false);

  useEffect(() => {
    callAPI();
  }, []);

  function callAPI() {
    fetch('https://eventhorizon.up.railway.app/users/profile', {
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        setApiResponse({
          unpublished_articles: res.unpublished_articles,
          published_articles: res.published_articles,
          user: res.user,
        });
        setIsLoading(false);
      })
      .catch((err) => err);
  }

  function togglePublishedPage() {
    if (unpublishedPage || profliePage) {
      setProfilePage(false);
      setUnpublishedPaged(false);
      setpublishedPaged(true);
    }
  }

  function toggleUnpublishedPage() {
    if (publishedPage || profliePage) {
      setpublishedPaged(false);
      setProfilePage(false);
      setUnpublishedPaged(true);
    }
  }

  function toggleProfilePage() {
    if (unpublishedPage || publishedPage) {
      setUnpublishedPaged(false);
      setpublishedPaged(false);
      return setProfilePage(true);
    }
  }

  const unpublishedPosts = apiResponse.unpublished_articles.map(
    (post, index) => {
      return (
        <div key={post._id}>
          <h4 className="latest-post-title">
            <Link className="nav-link latest-post-title" to={post.url}>
              {post.title}
            </Link>
          </h4>
          <p className="latest-post-date">
            <span className="article-user">By {post.user.username}</span>
            <span>&#8226;</span>
            <span className="article-date">{post.date_formatted}</span>
          </p>
          <div>
            <p className="latest-post-summary">{post.summary}</p>
          </div>
        </div>
      );
    }
  );

  const publishedPosts = apiResponse.published_articles.map((post, index) => {
    return (
      <div key={post._id}>
        <h4 className="latest-post-title">
          <Link className="nav-link latest-post-title" to={post.url}>
            {post.title}
          </Link>
        </h4>
        <p className="latest-post-date">
          <span className="article-user">By {post.user.username}</span>
          <span>&#8226;</span>
          <span className="article-date">{post.date_formatted}</span>
        </p>
        <div>
          <p className="latest-post-summary">{post.summary}</p>
        </div>
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
      <div className="profile-page">
        <header className="">
          <h1 className="profile-user">
            {apiResponse.user.firstName} {apiResponse.user.lastName}
          </h1>
          <ul className="profile-tabs">
            <li onClick={toggleProfilePage}>Profile</li>
            <li className="tab-active" onClick={toggleUnpublishedPage}>
              unpublished articles
            </li>
            <li onClick={togglePublishedPage}>published articles</li>
          </ul>
        </header>
        <section className="latest-posts-container">
          <div className="latest-posts-grid">{unpublishedPosts}</div>
        </section>
      </div>
    );
  } else if (publishedPage) {
    return (
      <div className="profile-page">
        <header className="">
          <h1 className="profile-user">
            {apiResponse.user.firstName} {apiResponse.user.lastName}
          </h1>
          <ul className="profile-tabs">
            <li onClick={toggleProfilePage}>Profile</li>
            <li onClick={toggleUnpublishedPage}>unpublished articles</li>
            <li className="tab-active" onClick={togglePublishedPage}>
              published articles
            </li>
          </ul>
        </header>
        <section className="latest-posts-container">
          <div className="latest-posts-grid">{publishedPosts}</div>
        </section>
      </div>
    );
  } else if (profliePage) {
    return (
      <div className="profile-page">
        <header className="">
          <h1 className="profile-user">
            {apiResponse.user.firstName} {apiResponse.user.lastName}
          </h1>
          <ul className="profile-tabs">
            <li className="tab-active" onClick={toggleProfilePage}>
              Profile
            </li>
            <li onClick={toggleUnpublishedPage}>unpublished articles</li>
            <li onClick={togglePublishedPage}>published articles</li>
          </ul>
        </header>
        <section className="latest-posts-container">
          <p>
            name: {apiResponse.user.firstName} {apiResponse.user.lastName}
          </p>
          <p>username: {apiResponse.user.username}</p>
          <p>email: {apiResponse.user.email}</p>
        </section>
      </div>
    );
  } else {
    return (
      <div className="profile-page">
        <header className="">
          <h1 className="profile-user">
            {apiResponse.user.firstName} {apiResponse.user.lastName}
          </h1>
          <ul className="profile-tabs">
            <li onClick={toggleProfilePage}>Profile</li>
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
