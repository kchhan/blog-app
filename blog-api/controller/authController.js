const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET login page
exports.login_get = (req, res, next) => {
  // React renders a login page
};

// POST submit login page
exports.login_post = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  });
};

// GET signup page
exports.signup_get = (req, res, next) => {
  // React renders a signup page
};

// POST submit signup page
exports.signup_post = (req, res, next) => {
  const body = req.body;

  // capitalize first letter in first name
  const firstname =
    body.first_name.charAt(0).toUpperCase() + body.first_name.slice(1);
  // capitalize first letter in last name
  const lastname =
    body.last_name.charAt(0).toUpperCase() + body.last_name.slice(1);
  const password = req.body.password;

  // encrypt password and make user
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return next(err);
    const user = new User({
      first_name: firstname,
      last_name: lastname,
      username: body.username,
      password: hash,
      comments: [],
    });

    user.save((err) => {
      if (err) {
        return next(err);
      }
      res.send({
        success: true,
      });
    });
  });
};
