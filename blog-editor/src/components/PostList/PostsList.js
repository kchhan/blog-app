import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './PostList.css';

const PostsList = () => {
  const [drafts, setDrafts] = useState([]);
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  const fetchData = () => {
    // fetch posts
    axios
      .get('http://localhost:5000/api/posts')
      .then((response) => {
        // newest blog posts go on top
        setPosts(response.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch drafts
    axios
      .get('http://localhost:5000/api/drafts')
      .then((response) => {
        setDrafts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditDraft = () => {};

  const handleDeleteDraft = () => {};

  const handleEditPost = () => {};

  const handleDeletePost = () => {};

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
                    onClick={handleEditDraft}
                    value='Edit'
                    className=''
                  />
                  <input
                    type='button'
                    onClick={handleDeleteDraft}
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
          {posts.map((post) => (
            <li key={post._id} className='post-list-card'>
              <Link to={`/posts/${post._id}`} className='post-list-link'>
                {post.title}
              </Link>
              <div>
              <input
                    type='button'
                    onClick={handleEditPost}
                    value='Edit'
                    className=''
                  />
                  <input
                    type='button'
                    onClick={handleDeletePost}
                    value='Delete'
                    className=''
                  />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PostsList;
