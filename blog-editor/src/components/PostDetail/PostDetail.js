import React, { useState, useEffect } from 'react';
import { API_ROOT } from '../../api-config'
import axios from 'axios';
import moment from 'moment';

import Footer from '../Footer/Footer';
import './PostDetail.css';

const PostDetail = (props) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `${API_ROOT}/api/posts/${props.match.params.id}`;

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

  // changes dates into a readable format
  // todo: do not change state directly
  const formatDates = () => {
    post.added = moment(new Date(post.added)).format('ll');
    comments.forEach((comment) => {
      return (comment.added = moment(new Date(comment.added)).format('lll'));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  formatDates();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div>
        <h1 className='post-title'>{post.title}</h1>
        <p className='post-added'>{post.added}</p>
        <div className='post-title-img'>
          <img
            src='https://source.unsplash.com/random/600x400/?technology'
            alt=''
          />
        </div>

        <p className='post-body'>{post.body}</p>

        <ul>
          {comments
            ? comments.map((comment) => {
                return (
                  <li key={comment._id} className='post-comment-card'>
                    <div className='post-comment-header'>
                      <span>
                        <i className='far fa-user'></i> {comment.user.username}
                      </span>
                      <span>{comment.added}</span>
                    </div>

                    <div>
                      <p className='post-comment'>
                        <i className='far fa-comment'></i> {comment.message}
                      </p>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </div>

      <Footer />
    </section>
  );
};

export default PostDetail;
