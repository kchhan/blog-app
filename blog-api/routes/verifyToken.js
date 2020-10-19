const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getCleanUser } = require('../util');
require('dotenv').config();

const User = require('../models/User');

// verify the token and return it if it's valid
router.get('/', (req, res) => {
  // check header or url parameters or post parameters for token
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({
      error: true,
      message: 'Token is required.',
    });
  }

  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      console.log('Error. Invalid token');
      return res.status(401).json({
        error: true,
        message: 'Invalid token.',
      });
    }
    
    // need to get user from mongodb? to compare with user that is sent from the browser
    
    // return 401 status if the userId does not match
    if (user.userId !== userData._id) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user.',
      });
    }

    // get basic user details
    const userObj = getCleanUser(user);
    return res.json({ user: userObj, token });
  });
});

module.exports = router;
