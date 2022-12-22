import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import { Navigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import logo from '../logo.svg';
import '../App.css';
import CommentForm from './CommentForm';
import { AuthContext } from '../Context/AuthContext';


function Blog() {
  const [apiResponse, setApiResponse] = useState({
    article: undefined,
    user: {},
    category: undefined,
    comments: [],
    error: undefined,
  });
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setisEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleSummary, setArticleSummary] = useState('');
  const [articleIsPublished, setArticleisPublished] = useState('');
  // adding params to state causes bugs when added as dependency on useEffect
  // const [blogId] = useState(useParams());
  const { blogId } = useParams();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    callAPI();
  }, [blogId]);

  function callAPI() {
    fetch(`https://eventhorizon.up.railway.app/blogs/${blogId}`, {
      mode: 'cors',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((res) => {
        setApiResponse({
          article: res.article,
          user: res.user,
          comments: res.comments,
          error: res.error,
        });
        setArticleTitle(res.article.title);
        setArticleSummary(res.article.summary);
        setEditorContent(res.article.content);
        setArticleisPublished(res.article.isPublished);
        setCategoryList(res.category_list);
        setIsLoading(false);
      })
      .catch((err) => err);
  }

  function editArticle() {
    console.log('is editing');
    return setisEditing(true);
  }

  function handleEditorChange(e) {
    //get content is used with editor component
    setEditorContent(e.target.getContent());
  }

  function handleTitleChange(e) {
    setArticleTitle(e.target.value);
  }

  function handleSummaryChange(e) {
    setArticleSummary(e.target.value);
  }

  function handleCheckboxChange(e) {
    if (e.target.checked) {
      setArticleisPublished(e.target.value);
    } else {
      setArticleisPublished(apiResponse.article.isPublished);
    }
  }

  async function submitEdit(event) {
    try {
      event.preventDefault();
      setIsLoading(true);
      // const articleCategory = document.querySelector('#article-category');
      const formData = new FormData(event.target);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      const jsonData = JSON.stringify(data);
      const response = await fetch(`https://eventhorizon.up.railway.app/blogs/${blogId}`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
        // body: JSON.stringify({
        //   title: articleTitle,
        //   category: articleCategory.value,
        //   summary: articleSummary,
        //   content: editorContent,
        //   isPublished: articleIsPublished,
        // }),
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

  async function deleteArticle() {
    try {
      setIsLoading(true);
      const response = await fetch(`https://eventhorizon.up.railway.app/blogs/${blogId}`, {
        method: 'DELETE',
        credentials: 'include',
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

  async function submitComment(event) {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      const jsonData = JSON.stringify(data);
  
      const response = await fetch(`https://eventhorizon.up.railway.app/blogs/${blogId}/comments/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      })
      const res = await response.json();
      if (!response.ok) {
        throw new Error('network response was not ok when submitting comment')
      } else if (response.ok) {
        console.log(res.isValid);
        return callAPI();
      }
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    }
  }

  function renderImage(data) {
    let buffer = new Buffer.from(data.image.data.data).toString('base64');
    let mimetype = data.image.contentType;
    return `data:${mimetype};base64,${buffer}`;
  }

  function displayEditAndDeleteBtn() {
    if (apiResponse.user === undefined || !isAuthenticated) {
      return (
        <div></div>
      )
    } else if (apiResponse.user._id === apiResponse.article.user._id && isAuthenticated) {
      return (
        <div>
             <button className="btn-edit btn" onClick={editArticle}>
              edit
            </button>
            <button className="btn-delete btn" onClick={deleteArticle}>
              Delete
            </button>
        </div>
      )
    }
  }

  //does not work when apiresponse.comments is undefined
  //works when apiResponse.comments has an empty array
  const commentList = apiResponse.comments.map((comment, index) => (
    <div key={index} className="comment-container">
      <p>
        <span className="comment-user">{comment.user.username}</span>
        <span className="comment-date">{comment.date_formatted}</span>
      </p>
      <p>{comment.comment}</p>
    </div>
  ));

  const categoryOptions = categoryList.map((category, index) => {
    if (apiResponse.article.category.category === category.category) {
      return (
        <option key={index} value={category._id}>
          {category.category}
        </option>
      );
    } else {
      return (
        <option key={index} value={category._id}>
          {category.category}
        </option>
      );
    }
  });

  const publishButton = function () {
    if (apiResponse.article.isPublished) {
      return (
        <div>
          <input
            type="checkbox"
            name="isPublished"
            onClick={handleCheckboxChange}
            value={false}
          ></input>
          <label className="blog-radio-label" htmlFor="isPublished">
            Unpublish
          </label>
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="checkbox"
            name="isPublished"
            onClick={handleCheckboxChange}
            value={true}
          ></input>
          <label className="blog-radio-label" htmlFor="isPublished">
            Publish
          </label>
        </div>
      );
    }
  };

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
      <div className="blog-form-page">
        <h1>Edit Article</h1>
        <form className="blog-form" action={`https://eventhorizon.up.railway.app/blogs/${blogId}`} encType="multipart/form-data" onSubmit={submitEdit}>
          <div>
            <label htmlFor="title">Article Title</label>
            <input
              className="blog-input-text"
              type="text"
              placeholder="article title"
              id="article-title"
              name="title"
              onChange={handleTitleChange}
              defaultValue={articleTitle}
            />
          </div>
          {/* <div>
            <label htmlFor="image">Article Image:</label>
            <input type="file" name="image" disabled/>
          </div> */}
          <div>
            <label htmlFor="category">Category</label>
            <select
              className="blog-input-select"
              type="select"
              placeholder="Select a Category"
              id="article-category"
              name="category"
              defaultValue={apiResponse.article.category._id}
            >
              <option value="">Select A Category</option>
              {categoryOptions}
            </select>
          </div>
          <div>
            <label htmlFor="summary">Summary</label>
            <textarea
              className="blog-input-area"
              name="summary"
              rows="3"
              placeholder="summary"
              id="article-summary"
              onChange={handleSummaryChange}
              defaultValue={apiResponse.article.summary}
            ></textarea>
          </div>
          {publishButton()}
          <div>
            <label htmlFor="content">Content</label>
            <Editor
              textareaName="content"
              id="article-content"
              onChange={handleEditorChange}
              initialValue={apiResponse.article.content}
            />
          </div>
          <div>
            <button
              className="register-button blog-button"
              type="submit"
              onClick={submitEdit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="App article-page">
        <article>
          <header className="article-header">
            <p className="category-tag">
              {apiResponse.article.category.category}
            </p>
            <h1>{apiResponse.article.title}</h1>
            <p className="article-summary">{apiResponse.article.summary}</p>
            <p className="article-date-user">
              <span className="article-user">
                By {apiResponse.article.user.username}
              </span>
              <span>&#8226;</span>
              <span className="article-date">
                {apiResponse.article.date_formatted}
              </span>
            </p>
            {displayEditAndDeleteBtn()}
          </header>
          <img
            alt="article"
            className="main-image"
            src={renderImage(apiResponse.article)}
          />

          <main
            className="article-content"
            dangerouslySetInnerHTML={{ __html: apiResponse.article.content }}
          ></main>
        </article>
        <section>
          <hr></hr>
          <h1>Comments</h1>
          <CommentForm commentRoute={`https://eventhorizon.up.railway.app/blogs/${blogId}/comments/create`} blogid={blogId} submitComment={submitComment} />
          {commentList}
        </section>
      </div>
    );
  }
}

export default Blog;
