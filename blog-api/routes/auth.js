const express = require('express');
const router = express.Router();

const auth_controller = require('../controller/authController');

// Log In (user)
router.get('/login', auth_controller.login_get);
router.post('/login', auth_controller.login_post);

// Sign Up (user)
router.get('/signup', auth_controller.signup_get);
router.post('/signup', auth_controller.signup_post);

// Log In (editor)
router.get('/admin/login', auth_controller.admin_login_get);
router.post('/admin/login', auth_controller.admin_login_post);

// Sign Up (editor)
router.get('/admin/signup', auth_controller.admin_signup_get);
router.post('/admin/signup', auth_controller.admin_signup_post);

module.exports = router;
