import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../Utils/Common';
import axios from 'axios';

import './PostForm.css';

const PostNew = (props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);
  const { newDraft } = props;
  const { isAdmin } = props;

  const handleSaveDraft = () => {
    let url = '';
    if (newDraft) {
      // save as new draft
      url = 'http://localhost:5000/api/drafts/new';
    } else {
      // updating an existing draft
      url = `http://localhost:5000/api/drafts/${props.match.params.id}`;
    }
    const token = getToken();
    const data = { title, body };

    axios.post(url, { token, data }).then((response) => {
      console.log(response);
      props.history.push('/')
    });
  };

  const handlePostFormSubmit = () => {
    const url = `http://localhost:5000/api/posts/new`;
    const token = getToken();
    const data = { title, body };

    axios.post(url, { token, data }).then((response) => {
      console.log(response);
      props.history.push('/')
    });
  };

  return (
    <section className='post-draft'>
      <h2 className='post-draft-title'>New Post/Draft</h2>
      <form>
        <div className='post-draft-form-group'>
          <label htmlFor='post-draft-title' className='post-draft-label'>
            Title
          </label>
          <input
            type='text'
            className='post-draft-input'
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            required
          />
        </div>

        <div className='post-draft-form-group'>
          <label htmlFor='post-draft-body' className='post-draft-label'>
            Body
          </label>
          <textarea
            type='text'
            className='post-draft-textarea'
            onChange={(e) => {
              setBody(e.target.value);
            }}
            value={body}
            required
          />
        </div>

        <div>
          {errors ? (
            <ul>
              {errors.map((error, index) => {
                return <li key={index}>{error.message}</li>;
              })}
            </ul>
          ) : null}
        </div>

        <div className='post-draft-form-group post-draft-submit-buttons'>
          <input
            type='button'
            value='Save Draft'
            onClick={handleSaveDraft}
            className='post-draft-submit'
          />
          <input
            type='button'
            value='Submit'
            onClick={handlePostFormSubmit}
            className='post-draft-submit'
          />
        </div>

        <div className='post-draft-redirect'>
          <Link to={'/'} className='post-draft-redirect-back'>
            Go Back
          </Link>
        </div>
      </form>
    </section>
  );
};

export default PostNew;
