const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const { body, check, validationResult } = require('express-validator');

// GET login page
exports.login_get = (req, res, next) => {};

// POST submit login page
exports.login_post = (req, res, next) => {};

// GET signup page
exports.signup_get = (req, res, next) => {};

// POST submit signup page
exports.login_post = (req, res, next) => {};
