import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import logo from '../logo.svg';
import '../App.css';

function Blog() {
  const [apiResponse, setApiResponse] = useState({article: undefined, isLoading: true, error: undefined});
  const [blogId, setBlogId] = useState(useParams())
  console.log(blogId);

  useEffect(() => {
    fetch(`${blogId.blogId}`)
      .then(res => res.json())
      .then(res => setApiResponse({
        article: res.article,
        isLoading: false,
        error: res.error
      }))
      .catch(err => err)
  }, [blogId]);

  function renderImage(data) {
    let buffer = new Buffer.from(data.image.data.data).toString('base64');
    let mimetype = data.image.contentType

    return `data:${mimetype};base64,${buffer}`
  }

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
        <header className="App-header">
          <p>{apiResponse.article.date}</p>
          <p>{apiResponse.article.title}</p>
          <p>{apiResponse.article.summary}</p>
          <img src={renderImage(apiResponse.article)} alt="article" />
        </header>
        <section>{apiResponse.article.content}</section>
      </div>
    );
  }
}

export default Blog;