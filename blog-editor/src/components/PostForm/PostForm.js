import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getToken } from '../../Utils/Common';
import { API_ROOT } from '../../api-config';
import axios from 'axios';

import './PostForm.css';

const PostForm = (props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);
  const { user, newPost, newDraft } = props;

  const history = useHistory();

  // fetches data if not a new post or new draft
  function fetchData() {
    const url = `${API_ROOT}/api/${props.type}/${props.match.params.id}/edit`;

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

  function handleSaveDraft() {
    if (user === 'Guest') {
      return setErrors([{ message: 'Sorry, Guests cannot change items' }]);
    }

    let url = '';

    const token = getToken();
    const data = { title, body };

    if (newDraft) {
      // save as new draft
      url = `${API_ROOT}/api/drafts/new`;
    } else {
      // updating an existing draft
      url = `${API_ROOT}/api/drafts/${props.match.params.id}/edit`;
    }

    axios
      .post(url, { token, data })
      .then((response) => {
        if (response.message === 'Error Creating Draft') {
          setErrors([{ message: 'There was an error when saving the draft' }]);
        } else {
          props.history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePostFormSubmit() {
    if (user === 'Guest') {
      return setErrors([{ message: 'Sorry, Guests cannot change items' }]);
    }

    let url = '';
    let urlSecond = '';

    const token = getToken();
    const data = { title, body };

    // new post or edit post
    if (newPost === true) {
      url = `${API_ROOT}/api/posts/new`;
      postSubmit();
    } else {
      url = `${API_ROOT}/api/posts/${props.match.params.id}/edit`;
      postSubmit();
    }

    // cannot use !newDraft because undefined is falsey
    if (newDraft === false) {
      // need to create new post
      url = `${API_ROOT}/api/posts/new`;
      // need to delete draft
      urlSecond = `${API_ROOT}/api/drafts/${props.match.params.id}/delete`;

      draftSubmit();
    }

    function postSubmit() {
      axios
        .post(url, { token, data })
        .then((response) => {
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function draftSubmit() {
      Promise.all([
        axios.post(url, { token, data }),
        axios.post(urlSecond, { token }),
      ])
        .then((response) => {
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // if not a new draft will set the title and body with existing data
  useEffect(() => {
    if (!newDraft) {
      fetchData();
    }
  }, [newDraft]);

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

        <div className='post-form-errors'>
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
