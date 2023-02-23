import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../logo.svg';
import { Buffer } from 'buffer';
import '../App.css';
import { Link, Navigate } from 'react-router-dom';

function Category() {
  const [apiResponse, setApiResponse] = useState({
    category_list: [],
    error: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setisEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    callAPI();
  }, [categoryId]);

  async function callAPI() {
    try {
      const response = await fetch(`https://event-horizon.onrender.com/category/${categoryId}`, {
        mode: 'cors',
        credentials: 'include'
      });
      const res = await response.json();
      setApiResponse({
        latest_article: res.latest_article,
        category_list: res.category_list,
        category: res.category,
        error: res.error,
      });
      setIsLoading(false);
      return;
    } catch (err) {
      console.error(err);
    }
  }

  function editCategory() {
    return setisEditing(true);
  }

  async function submitEdit() {
    try {
      setIsLoading(true);
      const categoryName = document.querySelector('#category-name');
      const response = await fetch(`https://event-horizon.onrender.com/category/${categoryId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: categoryName.value }),
      });
      const res = await response.json();
      console.log('result:', res);
      if (!response.ok) {
        throw new Error('network response was not ok');
      } else if (response.ok) {
        console.log('response ok', response.status);
        setisEditing(false);
        return callAPI();
      }
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    }
  }

  async function deleteCategory() {
    try {
      setIsLoading(true);
      const response = await fetch(`https://event-horizon.onrender.com/category/${categoryId}`, {
        method: 'DELETE',
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('network response was not ok');
      } else if (response.ok) {
        setIsLoading(false);
        return setIsDeleted(true);
      }
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    }
  }

  // const posts = apiResponse.category_list.map((post, index) => {
  //   let buffer = new Buffer.from(post.image.data.data).toString('base64');
  //   let mimetype = post.image.contentType;
  //   return (
  //     <div key={post._id}>
  //       <h4>
  //         <Link className="nav-link" to={post.url}>
  //           {post.title}
  //         </Link>
  //       </h4>
  //       <p>{post.summary}</p>
  //       <p>{post.date}</p>
  //       <img alt="article" src={`data:${mimetype};base64,${buffer}`} />
  //     </div>
  //   );
  // });

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
            </p>
          </div>
          <div className="latest-header-article-summary">
            <p className="">{article.summary}</p>
          </div>
        </div>
      </div>
    );
  }

  const posts = apiResponse.category_list.slice(1).map((post, index) => {
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


  if (isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  } else if (isDeleted) {
    return <Navigate to="/blogs" replace="true" />;
  } else if (isEditing) {
    return (
      <div className="App">
        <form action={`https://event-horizon.onrender.com/category/${categoryId}`} method="">
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              placeholder="category"
              name="category"
              id="category-name"
              required
            />
          </div>
          <button type="submit" onClick={submitEdit}>
            Submit
          </button>
        </form>
      </div>
    );
  } else if (apiResponse.category_list.length < 1) {
    return (
      <div className="App latest-page">
      <header className="latest-header">
        <h1>no articles found</h1>
      </header>
      <hr></hr>
    </div>
    )
  } else {
    return (
      <div className="App latest-page">
        <header className="latest-header">
          <h1>{apiResponse.category.category}</h1>
          <p>
            Read articles related to {apiResponse.category.category} and
            discover the most recent blogs
          </p>
          {displayLatestArticle(apiResponse.latest_article)}
        </header>
        <hr></hr>
        <section className="latest-posts-container">
          <h1>Recent blogs</h1>
          <div className="latest-posts-grid">{posts}</div>
        </section>
      </div>
    );
  }
}

export default Category;
