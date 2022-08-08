import { useEffect, useState } from 'react';
import '../App.css';

function CommentForm() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch('create')
      .then((res) => res.json())
      .then((res) => setApiResponse(res))
      .catch((err) => err);
  }, [setApiResponse]);

  return (
    <div className="App">
      <h1>{apiResponse.header}</h1>
      <form action="" method="POST">
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            name="comment"
            rows="10"
            placeholder="post a comment"
          ></textarea>
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

export default CommentForm;
