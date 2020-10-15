const express = require('express');
const router = express.Router();

const post_controller = require('../controller/postController');

// GET and POST new blog posts (editor only)
router.get('/posts/new', post_controller.post_create_get);
router.post('/posts/new', post_controller.post_create_post);

// GET and UPDATE blog posts (editor only)
router.get('/posts/:postId/edit', post_controller.post_update_get);
router.post('/posts/:postId/edit', post_controller.post_update_post);

// GET and DELETE blog post
router.get('/posts/:postId/delete', post_controller.post_delete_get);
router.post('/posts/:postId/delete', post_controller.post_delete_post);

// GET specfic blog post and POST comments
router.get('/posts/:postId', post_controller.post_detail_get);
router.get('/posts/:postId', post_controller.post_detail_post);

// GET all posts
router.get('/', post_controller.posts_get);

module.exports = router;
