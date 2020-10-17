const User = require('../models/User');
const bcrypt = require('bcryptjs');

const passport = require('passport');

// GET login page
exports.login_get = (req, res, next) => {
  // React renders a login page
};

// POST submit login page
exports.login_post = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No User Exists');
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.send('Successfully Authenticated');
      console.log(req.user);
    });
  })(req, res, next);
};

// GET signup page
exports.signup_get = (req, res, next) => {
  // React renders a signup page
};

// POST submit signup page
exports.signup_post = (req, res, next) => {
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

    user.save((err) => {
      if (err) {
        res.end('Error: Error creating user');
      }
      res.send({
        success: true,
      });
    });
  });
};
