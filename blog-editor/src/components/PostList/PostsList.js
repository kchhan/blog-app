import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getToken } from '../../Utils/Common';
import { API_ROOT } from '../../api-config';
import axios from 'axios';

import './PostList.css';

const PostsList = (props) => {
  const [drafts, setDrafts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = props;

  const history = useHistory();

  function fetchData() {
    const postUrl = `${API_ROOT}/api/posts`;
    const draftUrl = `${API_ROOT}/api/drafts`;

    Promise.all([
      // fetch posts
      axios.get(postUrl).then((response) => setPosts(response.data.reverse())),
      // fetch drafts
      axios.get(draftUrl).then((response) => setDrafts(response.data)),
    ]).catch((err) => {
      console.log(err);
    });
  }

  function handleEdit(type, id) {
    history.push(`/${type}/${id}/edit`);
  }

  function handleDelete(type, id) {
    if (user === 'Guest') {
      return setErrors([{ message: 'Sorry, Guests cannot change items' }]);
    }

    const url = `${API_ROOT}/api/${type}/${id}/delete`;
    const token = getToken();

    axios
      .post(url, { token })
      .then((response) => {
        if (response.data.message === 'Successfully Deleted') {
          fetchData();
        } else {
          setErrors([{ message: 'There was a problem deleting your item' }]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // page is loaded
  useEffect(() => {
    setLoading(false);
  }, [posts, drafts]);

  // fetch data because page is loaded
  useEffect(() => {
    fetchData();
  }, [loading]);

  function handleClick() {
    const path = '/new';
    history.push(path);
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className='post-list'>
      <div className='post-list-header'>
        <h1 className='title'>Posts and Drafts Lists:</h1>

        <button
          onClick={handleClick}
          className='post-list-button post-list-new'
        >
          New Post/Draft
        </button>
      </div>

      <div className='post-list-errors'>
        {errors ? (
          <ul>
            {errors.map((error, index) => {
              return <li key={index}>{error.message}</li>;
            })}
          </ul>
        ) : null}
      </div>

      <div className='list-group'>
        <h2 className='post-list-title'>Drafts:</h2>

        <ul>
          {drafts.length > 0 ? (
            drafts.map((draft) => (
              <li key={draft._id} className='post-list-card'>
                <p className='post-list-link'>{draft.title}</p>
                <div className='post-list-button-group'>
                  <button
                    onClick={() => {
                      handleEdit('drafts', draft._id);
                    }}
                    className='post-list-button post-list-edit'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete('drafts', draft._id);
                    }}
                    className='post-list-button post-list-delete'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>There are no drafts</p>
          )}
        </ul>
      </div>

      <hr></hr>

      <div className='list-group'>
        <h2 className='post-list-title'>Posts:</h2>
        <ul>
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post._id} className='post-list-card'>
                <Link to={`/posts/${post._id}`} className='post-list-link'>
                  {post.title}
                </Link>
                <div className='post-list-button-group'>
                  <button
                    onClick={() => {
                      handleEdit('posts', post._id);
                    }}
                    className='post-list-button post-list-edit'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete('posts', post._id);
                    }}
                    className='post-list-button post-list-delete'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>There are no posts</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default PostsList;
