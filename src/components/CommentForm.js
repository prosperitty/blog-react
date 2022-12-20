import '../App.css';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

function CommentForm(props) {
  const { isAuthenticated } = useContext(AuthContext);

  function handleComment(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const jsonData = JSON.stringify(data);

    fetch(props.commentRoute, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((res) => {
        props.callAPI();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (isAuthenticated) {
    return (
      <div>
        <form
          action={props.commentRoute}
          method="POST"
          onSubmit={handleComment}
        >
          <div className="comment-field-container">
            {/* <label htmlFor="comment">Comment:</label> */}
            <textarea
              name="comment"
              rows="4"
              placeholder="Add a Comment"
              className="comment-textarea"
              required
            ></textarea>
          </div>
          <div>
            <button className="btn-submit btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <form action={props.commentRoute} method="POST">
          <div className="comment-field-container">
            {/* <label htmlFor="comment">Comment:</label> */}
            <textarea
              name="comment"
              rows="4"
              placeholder="Sign in to add a comment"
              className="comment-textarea"
              disabled
            ></textarea>
          </div>
        </form>
      </div>
    );
  }
}

export default CommentForm;
