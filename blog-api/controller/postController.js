const Post = require('../models/Post');
const Comment = require('../models/Comment');

const async = require('async');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// GET all posts
exports.posts_get = (req, res, next) => {
  Post.find({})
    .exec((err, posts_data) => {
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
        Comment.find({ post: req.params.id }).exec(callback);
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
        message: req.body.message,
        added: Date.now(),
        post: req.params.id,
      });

      // push comment id to post array
      Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              comment: comment,
            },
          },
        },
        (err, doc) => {
          if (err) console.log(err);
          else console.log(doc);
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
exports.post_create_get = (req, res, next) => {};

// POST new blog post (editor)
exports.post_create_post = (req, res, next) => {};

// GET form for update blog post (editor)
exports.post_update_get = (req, res, next) => {};

// POST update of blog post (editor)
exports.post_update_post = (req, res, next) => {};

// GET confirmation for deleting blog post(editor)
exports.post_delete_get = (req, res, next) => {};

// POST delete blog post (editor)
exports.post_delete_post = (req, res, next) => {};
