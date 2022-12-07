import '../App.css';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

function CommentForm(props) {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return (
      <div>
        <form action={props.commentRoute} method="POST">
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
