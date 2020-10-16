const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const { body, check, validationResult } = require('express-validator');

// GET all posts
exports.posts_get = (req, res, next) => {
  Post.find({})
    .populate('comment')
    .exec((err, posts_data) => {
      if (err) {
        return next(err);
      } else {
        res.send(posts_data);
      }
    });
};

// GET read blog body and comment form on bottom
exports.post_detail_get = (req, res, next) => {};

// POST comment on blog
exports.post_detail_post = (req, res, next) => {};

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
