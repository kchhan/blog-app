import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../Utils/Common';

const CommentForm = (props) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const { match } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = getToken();
    axios
      .post(`http://localhost:5000/api/posts/${match.params.id}`, {message, token})
      .then((response) => {
        // gets back response 'success' or 'failure'
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <form>
      <div>
        <label htmlFor='message'>Message</label>
        <input
          type='text'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>

      <div>
        <input type='button' value='submit' onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default CommentForm;
