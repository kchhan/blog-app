import React, { useState, useEffect } from 'react';

const PostsList = ({}) => {
  const [data, setData] = useState();

  const fetchAPI = () => fetch('http://localhost:5000/api/posts')
    .then((res) => res.json())
    .then((res) => setData(res));

  useEffect(() => {
    fetchAPI();
  }, []);

return <div></div>;
};

export default PostsList;
