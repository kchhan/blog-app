const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Draft = require('../models/Draft');

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

  jwt.verify(req.body.token, process.env.SECRET, (err, authData) => {
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

      // push comment id to post comment array
      Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: comment,
          },
        },
        (err, doc) => {
          if (err) console.log(err);
        }
      );

      // push comment id to user comment array
      User.findByIdAndUpdate(
        authData.userId,
        {
          $push: {
            comments: comment,
          },
        },
        (err, doc) => {
          if (err) console.log(err);
        }
      );

      // save new comment and send status back to react
      comment.save((err) => {
        if (err) {
          return res.send({ error: err, status: 'error' });
        } else {
          return res.send({
            message: comment.message,
            status: 'success',
          });
        }
      });
    }
  });
};

// GET form for now blog post (editor)
exports.post_create_get = (req, res, next) => {
  // React renders a post form
};

// POST new blog post (editor)
exports.post_create_post = (req, res, next) => {
  // get info from draft form
  // create post
  // if exising draft get id and delete
};

// GET form for update blog post (editor)
exports.post_update_get = (req, res, next) => {
  // get post id and send data to post from
};

// POST update of blog post (editor)
exports.post_update_post = (req, res, next) => {};

// GET confirmation for deleting blog post(editor)
exports.post_delete_get = (req, res, next) => {};

// POST delete blog post (editor)
exports.post_delete_post = (req, res, next) => {};
