const express = require('express');
const router = express.Router();

const draft_controller = require('../controller/draftController');

// GET and POST new blog posts
router.get('/new', draft_controller.draft_create_get);
router.post('/new', draft_controller.draft_create_post);

// GET and UPDATE blog posts
router.get('/:id/edit', draft_controller.draft_update_get);
router.post('/:id/edit', draft_controller.draft_update_post);

// GET and DELETE blog post
router.get('/:id/delete', draft_controller.draft_delete_get);
router.post('/:id/delete', draft_controller.draft_delete_post);

// GET all posts
router.get('/', draft_controller.drafts_get);

module.exports = router;
