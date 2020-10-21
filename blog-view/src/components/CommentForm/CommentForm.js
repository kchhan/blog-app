import React, { useState } from 'react';

const CommentForm = (props) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    else return props.handleSubmit(message);
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
