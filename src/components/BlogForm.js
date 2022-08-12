import { useEffect, useState } from 'react';
import '../App.css';

function BlogForm() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch('create')
      .then((res) => res.json())
      .then((res) => setApiResponse(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="App">
      <form action="" enctype="multipart/form-data" method="POST">
        <div>
          <label for="title">Article Title:</label>
          <input
            type="text"
            placeholder="article title"
            name="title"
            required="true"
            // value="article.title"
          />
        </div>
        <div>
          <label for="image">Article Image:</label>
          <input type="file" name="image" />
        </div>
        <div>
          <label for="summary">Summary:</label>
          <textarea name="summary" rows="3" placeholder="summary"></textarea>
        </div>
        <div>
          <label for="content">Content:</label>
          <textarea name="content" rows="10" placeholder="content"></textarea>
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">
            Submit
          </button>
        </div>
      </form>

      <p>{apiResponse.message}</p>
    </div>
  );
}

export default BlogForm;
