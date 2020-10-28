import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../../api-config';
import axios from 'axios';

import './PostList.css';

const PostsList = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get(`${API_ROOT}/api/posts`)
      .then((res) => {
        setData(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className='post-list'>
      <ul>
        {data.map((post) => (
          <li key={post._id} className='post-list-card'>
            <Link to={`/posts/${post._id}`} className='post-list-link'>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostsList;
