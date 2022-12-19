import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import { Editor } from '@tinymce/tinymce-react';
import '../App.css';

function BlogForm() {
  const [apiResponse, setApiResponse] = useState({
    header: undefined,
    category_list: [],
  });

  useEffect(() => {
    fetch('https://eventhorizon.up.railway.app/blogs/create', {
      mode: 'cors',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((res) =>
        setApiResponse({
          header: res.header,
          category_list: res.category_list,
        })
      )
      .catch((err) => err);
  }, []);

  const categoryList = apiResponse.category_list.map((category, index) => (
    <option key={index} value={category._id}>
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
      <div className="blog-form-page">
        <h1>{apiResponse.header}</h1>
        <form
          className="blog-form"
          action="https://eventhorizon.up.railway.app/blogs/create"
          encType="multipart/form-data"
          method="POST"
        >
          <div>
            <label htmlFor="title">Title:</label>
            <input
              className="blog-input-text"
              type="text"
              placeholder="article title"
              name="title"
              required
              // value="article.title"
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              className="blog-input-text"
              type="file"
              name="image"
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              className="blog-input-select"
              type="select"
              placeholder="Select a Category"
              name="category"
              required
            >
              <option value="">Select A Category</option>
              {categoryList}
            </select>
          </div>
          <div>
            <label htmlFor="summary">Summary</label>
            <textarea
              className="blog-input-area"
              name="summary"
              rows="3"
              placeholder="summary"
              required
            ></textarea>
          </div>
          <div className="blog-radio">
            <label>Publish Article?</label>
            <input type="radio" name="isPublished" id="yes" value={true} />
            <label className="blog-radio-label" htmlFor="yes">
              yes
            </label>
            <input type="radio" name="isPublished" id="no" value={false} />
            <label className="blog-radio-label" htmlFor="no">
              no
            </label>
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <Editor textareaName="content" required />
            {/* <textarea name="content" rows="10" placeholder="content" required></textarea> */}
          </div>
          <div>
            <button className="register-button blog-button" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default BlogForm;
