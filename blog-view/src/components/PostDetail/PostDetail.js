import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header';

const PostDetail = ({ match }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${match.params.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match]);

  return (
    <div>
      <Header />
      <section>
        <h1>{data.title}</h1>
        <p>{data.added}</p>
        <p>{data.body}</p>
        {/* will add comments later */}
      </section>
    </div>
  );
};

export default PostDetail;
