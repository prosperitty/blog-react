import { useEffect, useState } from 'react';
import '../App.css';

function CategoryForm() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch('create', {
      mode: 'cors'
    })
      .then((res) => res.json())
      .then((res) => setApiResponse(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="register-page">
      <form className="register-container" action="" method="POST">
        <label htmlFor="category">Category</label>
        <input
          className="register-input"
          type="text"
          placeholder="category"
          name="category"
          required
        />
        <button className="register-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CategoryForm;
