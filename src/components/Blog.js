import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import { Link, Navigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import logo from '../logo.svg';
import '../App.css';

function Blog() {
  const [apiResponse, setApiResponse] = useState({
    article: undefined,
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
  const [blogId] = useState(useParams());

  useEffect(() => {
    callAPI();
  }, [blogId]);

  function callAPI() {
    fetch(`${blogId.blogId}`)
      .then((res) => res.json())
      .then((res) => {
        setApiResponse({
          article: res.article,
          comments: res.comments,
          error: res.error,
        });
        setArticleTitle(res.article.title)
        setArticleSummary(res.article.summary)
        setEditorContent(res.article.content)
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

  async function submitEdit() {
    try {
      setIsLoading(true);
      const articleCategory = document.querySelector('#article-category');
      const response = await fetch(`${blogId.blogId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: articleTitle,
          category: articleCategory.value,
          summary: articleSummary,
          content: editorContent,
          isPublished: articleIsPublished,
        }),
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
      const response = await fetch(`${blogId.blogId}`, {
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

  function renderImage(data) {
    let buffer = new Buffer.from(data.image.data.data).toString('base64');
    let mimetype = data.image.contentType;
    return `data:${mimetype};base64,${buffer}`;
  }

  //does not work when apiresponse.comments is undefined
  //works when apiResponse.comments has an empty array
  const commentList = apiResponse.comments.map((comment, index) => (
    <div key={index}>
      <p>{comment.date}</p>
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
          <label htmlFor="isPublished">unpublish</label>
          <input
            type="checkbox"
            name="isPublished"
            onClick={handleCheckboxChange}
            value={false}
          ></input>
        </div>
      );
    } else {
      return (
        <div>
          <label htmlFor="isPublished">publish</label>
          <input
            type="checkbox"
            name="isPublished"
            onClick={handleCheckboxChange}
            value={true}
          ></input>
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
      <div className="App">
        <form action="" encType="multipart/form-data">
          <div>
            <label htmlFor="title">Article Title:</label>
            <input
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
            <input type="file" name="image" />
          </div> */}
          <div>
            <label htmlFor="category">Category:</label>
            <select
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
            <label htmlFor="summary">Summary:</label>
            <textarea
              name="summary"
              rows="3"
              placeholder="summary"
              id="article-summary"
              onChange={handleSummaryChange}
              defaultValue={apiResponse.article.summary}
            ></textarea>
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <Editor
              textareaName="content"
              id="article-content"
              onChange={handleEditorChange}
              value={apiResponse.article.content}
            />
            {/* <textarea name="content" rows="10" placeholder="content" required></textarea> */}
          </div>
          {publishButton()}
          <div>
            <button type="submit" onClick={submitEdit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="App">
        <button onClick={deleteArticle}>Delete</button>
        <button onClick={editArticle}>edit</button>
        <header className="App-header">
          <p>{apiResponse.article.category.category}</p>
          <p>{apiResponse.article.date}</p>
          <p>{apiResponse.article.title}</p>
          <p>{apiResponse.article.summary}</p>
          <img src={renderImage(apiResponse.article)} alt="article" />
        </header>

        <main
          dangerouslySetInnerHTML={{ __html: apiResponse.article.content }}
        ></main>

        <section>
          <Link to="comments/create">new comment</Link>
          {commentList}
        </section>
      </div>
    );
  }
}

export default Blog;
