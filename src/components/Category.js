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
  const [categoryId] = useState(useParams());

  useEffect(() => {
    callAPI();
  }, []);

  async function callAPI() {
    try {
      const response = await fetch(`${categoryId.categoryId}`);
      const res = await response.json();
      setApiResponse({
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
      const response = await fetch(`${categoryId.categoryId}`, {
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
      const response = await fetch(`${categoryId.categoryId}`, {
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
        <form action="" method="">
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
  } else {
    return (
      <div className="App">
        <header>{apiResponse.category.category}</header>
        <section>{posts}</section>
        <form method="">
          <button onClick={deleteCategory}>Delete</button>
          <button onClick={editCategory}>edit</button>
        </form>
      </div>
    );
  }
}

export default Category;
