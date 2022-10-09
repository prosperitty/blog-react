import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';

function BlogForm() {
  const [apiResponse, setApiResponse] = useState({
    header: undefined,
    category_list: [],
  });

  useEffect(() => {
    fetch('create')
      .then((res) => res.json())
      .then((res) => setApiResponse({
        header: res.header,
        category_list: res.category_list,
      }))
      .catch((err) => err);
  }, []);

  const categoryList = apiResponse.category_list.map((category, index) => (
    <option key={index}>
      {category.category}
    </option>
  ));

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
        <h1>{apiResponse.header}</h1>
        <form action="" encType="multipart/form-data" method="POST">
          <div>
            <label htmlFor="title">Article Title:</label>
            <input
              type="text"
              placeholder="article title"
              name="title"
              required
              // value="article.title"
            />
          </div>
          <div>
            <label htmlFor="image">Article Image:</label>
            <input type="file" name="image" required />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select type="select" placeholder="Select a Category" name="category" required>
              <option value="">Select A Category</option>
              {categoryList}
            </select>
          </div>
          <div>
            <label htmlFor="summary">Summary:</label>
            <textarea name="summary" rows="3" placeholder="summary" required></textarea>
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea name="content" rows="10" placeholder="content" required></textarea>
          </div>
          <div>
            <button type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default BlogForm;
