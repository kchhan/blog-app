import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './PostList.css';

const PostsList = () => {
  const [drafts, setDrafts] = useState([]);
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  function fetchData() {
    const postUrl = 'http://localhost:5000/api/posts';
    const draftUrl = 'http://localhost:5000/api/drafts';

    // fetch posts
    axios
      .get(postUrl)
      .then((response) => {
        // newest blog posts go on top
        setPosts(response.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch drafts
    axios
      .get(draftUrl)
      .then((response) => {
        setDrafts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEdit(type, id) {
    history.push(`/${type}/${id}/edit`);
  }

  function handleDelete(type, id) {
    const url = `http://localhost:5000/api/${type}/${id}/delete`;

    axios
      .post(url)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    const path = '/new';
    history.push(path);
  };

  return (
    <section className='post-list'>
      <div>
        <h2 className='post-list-title'>Drafts</h2>
        <button onClick={handleClick}>New Post</button>
        <ul>
          {drafts ? (
            drafts.map((draft) => (
              <li key={draft._id} className='post-list-draft-card'>
                <p>{draft.title}</p>
                <div>
                  <input
                    type='button'
                    onClick={() => {
                      handleEdit('drafts', draft._id);
                    }}
                    value='Edit'
                    className=''
                  />
                  <input
                    type='button'
                    onClick={() => {
                      handleDelete('drafts', draft._id);
                    }}
                    value='Delete'
                    className=''
                  />
                </div>
              </li>
            ))
          ) : (
            <p>There are no drafts</p>
          )}
        </ul>
      </div>

      <div>
        <h2 className='post-list-title'>Posts</h2>
        <ul>
          {posts ? (
            posts.map((post) => (
              <li key={post._id} className='post-list-card'>
                <Link to={`/posts/${post._id}`} className='post-list-link'>
                  {post.title}
                </Link>
                <div>
                  <input
                    type='button'
                    onClick={() => {
                      handleEdit('posts', post._id);
                    }}
                    value='Edit'
                    className=''
                  />
                  <input
                    type='button'
                    onClick={() => {
                      handleDelete('posts', post._id);
                    }}
                    value='Delete'
                    className=''
                  />
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
