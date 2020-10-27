import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../Utils/Common';
import axios from 'axios';

import './PostForm.css';

const PostForm = (props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);
  const { newDraft } = props;
  const { newPost } = props;
  //const { isAdmin } = props;

  function fetchData() {
    const url = `http://localhost:5000/api/${props.type}/${props.match.params.id}/edit`;

    axios
      .get(url)
      .then((response) => {
        // set title and body
        setTitle(response.data.title);
        setBody(response.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSaveDraft = () => {
    let url = '';
    if (newDraft) {
      // save as new draft
      url = 'http://localhost:5000/api/drafts/new';
    } else {
      // updating an existing draft
      url = `http://localhost:5000/api/drafts/${props.match.params.id}/edit`;
    }
    const token = getToken();
    const data = { title, body };

    axios
      .post(url, { token, data })
      .then((response) => {
        console.log(response);
        props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePostFormSubmit = () => {
    let url = '';
    if (newPost) {
      url = `http://localhost:5000/api/posts/new`;
    } else {
      url = `http://localhost:5000/api/posts/${props.match.params.id}/edit`;
    }

    const token = getToken();
    const data = { title, body };

    axios
      .post(url, { token, data })
      .then((response) => {
        console.log(response);
        props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!newDraft) {
      fetchData();
    }
  }, []);

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
          {
            // only render 'save draft' if type is draft
            props.type === 'drafts' ? (
              <input
                type='button'
                value='Save Draft'
                onClick={handleSaveDraft}
                className='post-draft-submit'
              />
            ) : null
          }
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

export default PostForm;
