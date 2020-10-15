const express = require('express');
const router = express.Router();

const auth_controller = require('../controller/authController');

// Log In
router.get('/login', auth_controller.login_get);
router.post('/login', auth_controller.login_post);

// Sign Up
router.get('/signup', auth_controller.signup_get);
router.post('/signup', auth_controller.signup_post);

module.exports = router;
