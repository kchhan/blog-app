const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const async = require('async');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// GET all posts
exports.posts_get = (req, res, next) => {
  Post.find({}).exec((err, posts_data) => {
    if (err) {
      return next(err);
    } else {
      return res.send(posts_data);
    }
  });
};

// GET read blog body and comment form on bottom
exports.post_detail_get = (req, res, next) => {
  async.parallel(
    {
      post: (callback) => {
        Post.findById(req.params.id).exec(callback);
      },
      comments: (callback) => {
        Comment.find({ post: req.params.id }).populate('user').exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.post === null) {
        const error = new Error('Post not found');
        return res.send({
          error: error,
        });
      }
      // successful
      return res.send(results);
    }
  );
};

// POST comment on blog
exports.post_detail_post = (req, res, next) => {
  // verify token before executing post
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if (err) {
      // token does not match. send forbidden status
      res.sendStatus(403);
    } else {
      // token matches. create comment
      const comment = new Comment({
        user: authData.userId,
        message: req.body.message,
        added: new Date(),
        post: req.params.id,
      });

      async.parallel(
        {
          post: (callback) => {
            Post.findByIdAndUpdate(req.params.id, {
              $push: { comments: comment },
            }).exec(callback);
          },
          users: (callback) => {
            User.findByIdAndUpdate(authData.userId, {
              $push: { comments: comment },
            }).exec(callback);
          },
        },
        (err, results) => {
          if (err) return next(err);

          // save new comment and send status back to react
          comment.save((err) => {
            if (err) {
              return res.send({
                error: err,
                message: 'Error Creating Comment',
              });
            } else {
              return res.send({
                message: comment.message,
                status: 'Successfully Created Comment',
              });
            }
          });
        }
      );
    }
  });
};

// GET form for now blog post (editor)
exports.post_create_get = (req, res, next) => {
  // React renders a post form
};

// POST new blog post (editor)
exports.post_create_post = (req, res, next) => {
  // React PostForm creates a post
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if (err) {
      // token does not match. send forbidden status
      res.sendStatus(403);
    } else {
      // token matches. create post
      const post = new Post({
        title: req.body.data.title,
        body: req.body.data.body,
      });

      // save new draft and send status back to react
      post.save((err) => {
        if (err) {
          return res.send({ error: err, message: 'Error Creating Post' });
        } else {
          return res.send({
            title: post.title,
            status: 'Successfully Created',
          });
        }
      });
    }
  });
};

// GET form for update blog post (editor)
exports.post_update_get = (req, res, next) => {
  // get post id and send data to post from
  Post.findById(req.params.id).exec((err, post_data) => {
    if (err) return next(err);
    if (post_data === null) {
      const error = new Error('Draft not found');
      return res.send({
        error: error,
      });
    }
    // successful
    return res.send(post_data);
  });
};

// POST update of blog post (editor)
exports.post_update_post = (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if (err) {
      // token does not match. send forbidden status
      res.sendStatus(403);
    } else {
      // token matches. update post
      Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.data.title,
            body: req.body.data.body,
          },
        },
        (err, result) => {
          if (err) console.log(err);
          else res.send({ message: 'Successfully Updated' });
        }
      );
    }
  });
};

// GET confirmation for deleting blog post(editor)
exports.post_delete_get = (req, res, next) => {};

// POST delete blog post (editor)
exports.post_delete_post = (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if (err) {
      // token does not match. send forbidden status
      res.sendStatus(403);
    } else {
      // token matches. delete post and respective comments
      async.parallel(
        {
          post: (callback) => {
            Post.findByIdAndDelete(req.params.id).exec(callback);
          },
          comments: (callback) => {
            Comment.deleteMany({ post: req.params.id }).exec(callback);
          },
        },
        (err, results) => {
          if (err) return next(err);

          // successful
          return res.send({ message: 'Successfully Deleted' });
        }
      );
    }
  });
};
