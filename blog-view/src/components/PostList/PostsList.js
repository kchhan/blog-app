import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostsList = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:5000/api/posts')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <main>
      <ul>
        {data.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PostsList;
