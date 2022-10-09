import { useEffect, useState } from 'react';
import '../App.css';

function CategoryForm() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch('create')
      .then((res) => res.json())
      .then((res) => setApiResponse(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="App">
      <form action="" method="POST">
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            placeholder="category"
            name="category"
            required
          />
        </div>
        <div>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
      <p>{apiResponse.message}</p>
    </div>
  );
}

export default CategoryForm;
