import React, { useState } from 'react';

import './CommentForm.css';

const CommentForm = (props) => {
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    else return props.handleSubmit(message);
  }

  return (
    <form className='comment-form'>
      <div className='comment-form-group'>
        <label htmlFor='message' className='comment-label'>
          Add A Comment
        </label>
        <input
          type='text'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className='comment-input'
        />
      </div>

      <div className='form-group'>
        <button onClick={handleSubmit} className='comment-input comment-submit'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
