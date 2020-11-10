const { nextTick } = require('async');
const jwt = require('jsonwebtoken');

// generate token and return it
// no password data
const generateToken = (user) => {
  if (!user) return null;

  const u = {
    userId: user._id,
    username: user.username,
  };

  return jwt.sign(u, process.env.SECRET, {
    expiresIn: 60 * 60 * 24, // 24 hours
  });
};

// return basic user details
const getCleanUser = (user) => {
  if (!user) return null;

  return {
    userId: user.userId,
    username: user.username,
  };
};

const verifyToken = (req, res, next) => {
  console.log(req.headers)
  // get auth header value
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ');
    // get token from array
    const bearerToken = bearer[1];
    // set token as req.token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    // no or wrong token. send forbidden
    res.sendStatus(403);
  }
};

module.exports = { generateToken, getCleanUser, verifyToken };
