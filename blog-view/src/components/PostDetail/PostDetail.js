import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Header from '../Header/Header';
import CommentForm from '../CommentForm/CommentForm';

const PostDetail = (props, { match }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { isLoggedIn } = props;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${props.match.params.id}`)
      .then((res) => {
        setPost(res.data.post);
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props, match]);

  return (
    <div>
      <Header isLoggedIn={props.isLoggedIn} />
      <section>
        <h1>{post.title}</h1>
        <p>{post.added}</p>
        <p>{post.body}</p>
        <ul>
          {comments
            ? comments.map((comment) => {
                return (
                  <div>
                    <li key={comment._id}>{comment.message}</li>
                    {/* <p>TODO: message time added</p> */}
                  </div>
                );
              })
            : null}
        </ul>
        {isLoggedIn ? <CommentForm match={props.match} /> : null}
      </section>
    </div>
  );
};

export default PostDetail;
