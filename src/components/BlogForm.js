import { useEffect, useState, useContext } from 'react';
import logo from '../logo.svg';
import { Editor } from '@tinymce/tinymce-react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '../App.css';
import API_URL from '../config';

function BlogForm() {
  const { isAuthenticated } = useContext(AuthContext);
  const [apiResponse, setApiResponse] = useState({
    header: undefined,
    category_list: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [blogURL, setBlogURL] = useState('');
  const [article, setArticle] = useState(false);

  useEffect(() => {
    callAPI();
  }, []);

  function callAPI() {
    fetch(`${API_URL}/blogs/create`, {
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        setApiResponse({
          header: res.header,
          category_list: res.category_list,
        });
        setIsLoading(false);
      })
      .catch((err) => err);
  }

  function submitArticle(event) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    // const data = {};
    // formData.forEach((value, key) => {
    //   data[key] = value;
    // });
    // const jsonData = JSON.stringify(data);

    fetch(`${API_URL}/blogs/create`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        setIsValid(res.isValid);
        setArticle(res.article);
        setBlogURL(res.blogURL);
        setIsLoading(false);
        // console.log('CLOUDINARY PHOTO URL IS==============',res.secure_url);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const categoryList = apiResponse.category_list.map((category, index) => {
    return (
      <option key={index} value={category._id}>
        {category.category}
      </option>
    );
  });

  if (isLoading) {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>Loading...</p>
        </header>
      </div>
    );
  } else if (isValid) {
    return <Navigate to={blogURL} replace='true' />;
  } else if (article && isAuthenticated) {
    return (
      <div className='blog-form-page'>
        <h1>{apiResponse.header}</h1>
        <form
          className='blog-form'
          action={`${API_URL}/blogs/create`}
          encType='multipart/form-data'
          method='POST'
          onSubmit={submitArticle}
        >
          <div>
            <label htmlFor='title'>Title:</label>
            <input
              className='blog-input-text'
              type='text'
              placeholder='article title'
              name='title'
              required
              defaultValue={article.title}
            />
          </div>
          <div>
            <label htmlFor='image'>Image</label>
            <input
              className='blog-input-text'
              type='file'
              name='image'
              required
            />
          </div>
          <div>
            <label htmlFor='category'>Category</label>
            <select
              className='blog-input-select'
              type='select'
              placeholder='Select a Category'
              name='category'
              defaultValue={article.category}
              required
            >
              <option value=''>Select A Category</option>
              {categoryList}
            </select>
          </div>
          <div>
            <label htmlFor='summary'>Summary</label>
            <textarea
              className='blog-input-area'
              name='summary'
              rows='3'
              placeholder='summary'
              defaultValue={article.summary}
              required
            ></textarea>
          </div>
          <div className='blog-radio'>
            <label>Publish Article?</label>
            <input
              type='radio'
              name='isPublished'
              id='yes'
              value={true}
              required
            />
            <label className='blog-radio-label' htmlFor='yes'>
              yes
            </label>
            <input type='radio' name='isPublished' id='no' value={false} />
            <label className='blog-radio-label' htmlFor='no'>
              no
            </label>
          </div>
          <div>
            <label htmlFor='content'>Content</label>
            <Editor
              textareaName='content'
              initialValue={article.content}
              required
            />
            {/* <textarea name="content" rows="10" placeholder="content" required></textarea> */}
          </div>
          <div>
            <button className='register-button blog-button' type='submit'>
              submit
            </button>
          </div>
        </form>
      </div>
    );
  } else if (isAuthenticated) {
    return (
      <div className='blog-form-page'>
        <h1>{apiResponse.header}</h1>
        <form
          className='blog-form'
          action={`${API_URL}/blogs/create`}
          encType='multipart/form-data'
          method='POST'
          onSubmit={submitArticle}
        >
          <div>
            <label htmlFor='title'>Title:</label>
            <input
              className='blog-input-text'
              type='text'
              placeholder='article title'
              name='title'
              required
              // value="article.title"
            />
          </div>
          <div>
            <label htmlFor='image'>Image</label>
            <input
              className='blog-input-text'
              type='file'
              name='image'
              required
            />
          </div>
          <div>
            <label htmlFor='category'>Category</label>
            <select
              className='blog-input-select'
              type='select'
              placeholder='Select a Category'
              name='category'
              required
            >
              <option value=''>Select A Category</option>
              {categoryList}
            </select>
          </div>
          <div>
            <label htmlFor='summary'>Summary</label>
            <textarea
              className='blog-input-area'
              name='summary'
              rows='3'
              placeholder='summary'
              required
            ></textarea>
          </div>
          <div className='blog-radio'>
            <label>Publish Article?</label>
            <input
              type='radio'
              name='isPublished'
              id='yes'
              value={true}
              required
            />
            <label className='blog-radio-label' htmlFor='yes'>
              yes
            </label>
            <input type='radio' name='isPublished' id='no' value={false} />
            <label className='blog-radio-label' htmlFor='no'>
              no
            </label>
          </div>
          <div>
            <label htmlFor='content'>Content</label>
            <Editor
              textareaName='content'
              init={{ plugins: ['link'] }}
              required
            />
            {/* <textarea name="content" rows="10" placeholder="content" required></textarea> */}
          </div>
          <div>
            <button className='register-button blog-button' type='submit'>
              submit
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className='blog-form-page'>
        <h1>{apiResponse.header}</h1>
        <form
          className='blog-form'
          action={`${API_URL}/blogs/create`}
          encType='multipart/form-data'
          method='POST'
        >
          <div>
            <label htmlFor='title'>Title:</label>
            <input
              className='blog-input-text'
              type='text'
              placeholder='article title'
              name='title'
              disabled
              // value="article.title"
            />
          </div>
          <div>
            <label htmlFor='image'>Image</label>
            <input
              className='blog-input-text'
              type='file'
              name='image'
              disabled
            />
          </div>
          <div>
            <label htmlFor='category'>Category</label>
            <select
              className='blog-input-select'
              type='select'
              placeholder='Select a Category'
              name='category'
              disabled
            >
              <option value=''>Select A Category</option>
              {categoryList}
            </select>
          </div>
          <div>
            <label htmlFor='summary'>Summary</label>
            <textarea
              className='blog-input-area'
              name='summary'
              rows='3'
              placeholder='summary'
              disabled
            ></textarea>
          </div>
          <div className='blog-radio'>
            <label>Publish Article?</label>
            <input
              type='radio'
              name='isPublished'
              id='yes'
              value={true}
              disabled
            />
            <label className='blog-radio-label' htmlFor='yes'>
              yes
            </label>
            <input
              type='radio'
              name='isPublished'
              id='no'
              value={false}
              disabled
            />
            <label className='blog-radio-label' htmlFor='no'>
              no
            </label>
          </div>
          <div>
            <label htmlFor='content'>Content</label>
            <Editor textareaName='content' disabled />
            {/* <textarea name="content" rows="10" placeholder="content" required></textarea> */}
          </div>
          <div>
            <button className='register-button blog-button' type='submit'>
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default BlogForm;
