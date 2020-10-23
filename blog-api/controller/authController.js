const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('dotenv').config();

const { body, check, validationResult } = require('express-validator');
const { generateToken, getCleanUser } = require('../util');

// GET login page
exports.login_get = (req, res, next) => {
  // React renders a login page
};

// POST submit login page
exports.login_post = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) throw err;
    if (!user) return res.send('Wrong username or password');
    req.logIn(user, (err) => {
      if (err) return next(err);
      const token = generateToken(user);
      const userObj = getCleanUser(user);
      return res.json({ user: userObj, token });
    });
  })(req, res, next);
};

// GET signup page
exports.signup_get = (req, res, next) => {
  // React renders a signup page
};

// POST submit signup page
exports.signup_post = [
  // validate
  body('first_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must not be at least 2 characters long')
    .isAlpha()
    .withMessage('Last name must contain only alphabetical characters'),

  body('last_name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must not be at least 2 characters long')
    .isAlpha()
    .withMessage('Last Name may only contain alphabetical charaters'),

  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must not be at least 3 characters long')
    .custom((value) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject('Username already taken');
        }
      });
    }),

  check('password').exists(),

  check(
    'confirm_password',
    'Confirm Password field must have the same value as the Password field'
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),

  // sanitize
  body('*').escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const { first_name, last_name, username, password } = req.body;

    // capitalize first letter in first name
    const firstname = first_name.charAt(0).toUpperCase() + first_name.slice(1);
    // capitalize first letter in last name
    const lastname = last_name.charAt(0).toUpperCase() + last_name.slice(1);

    // encrypt password and make user
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return next(err);
      const user = new User({
        first_name: firstname,
        last_name: lastname,
        username: username,
        password: hash,
        comments: [],
      });

      // there are errors
      if (!errors.isEmpty()) {
        return res.send({
          success: false,
          errors: errors.array(),
        });
      }

      user.save((err) => {
        if (err) {
          return res.end('Error: Error creating user');
        }
        return res.send({
          success: true,
        });
      });
    });
  },
];
