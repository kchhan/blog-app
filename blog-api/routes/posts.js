const express = require('express');
const router = express.Router();

const post_controller = require('../controller/postController');

// GET and POST new blog posts (editor only)
router.get('/new', post_controller.post_create_get);
router.post('/new', post_controller.post_create_post);

// GET and UPDATE blog posts (editor only)
router.get('/:id/edit', post_controller.post_update_get);
router.post('/:id/edit', post_controller.post_update_post);

// GET and DELETE blog post
router.get('/:id/delete', post_controller.post_delete_get);
router.post('/:id/delete', post_controller.post_delete_post);

// GET specfic blog post and POST comments
router.get('/:id', post_controller.post_detail_get);
router.post('/:id', post_controller.post_detail_post);

// GET all posts
router.get('/', post_controller.posts_get);

module.exports = router;
