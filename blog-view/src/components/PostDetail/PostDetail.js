import React, { useState, useEffect } from 'react';
import { getToken } from '../../Utils/Common';
import axios from 'axios';
import moment from 'moment';

import CommentForm from '../CommentForm/CommentForm';

const PostDetail = (props) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = props;

  const url = `http://localhost:5000/api/posts/${props.match.params.id}`;

  const fetchData = () => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setPost(response.data.post);
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSubmit = (message) => {
    const token = getToken();
    axios
      .post(url, {
        message,
        token,
      })
      .then((response) => {
        // gets back response 'success' or 'failure'
        if (response.data.status === 'success') {
          fetchData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // changes dates into a readable format
  // todo: do not change state directly
  const formatDates = () => {
    post.added = moment(new Date(post.added)).format('lll');
    comments.forEach((comment) => {
      return (comment.added = moment(new Date(comment.added)).format('lll'));
    });
  };

  useEffect(() => {
    fetchData()
  }, []);

  formatDates();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section>
        <h1>{post.title}</h1>
        <p>{post.added}</p>
        <p>{post.body}</p>

        <ul>
          {comments
            ? comments.map((comment) => {
                return (
                  <li key={comment._id}>
                    <div>
                      <span>{comment.user.username}</span> :
                      <span> {comment.added}</span>
                      <p>{comment.message}</p>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>

        {isLoggedIn ? <CommentForm handleSubmit={handleSubmit} /> : null}
      </section>
    </div>
  );
};

export default PostDetail;
