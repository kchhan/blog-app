const jwt = require('jsonwebtoken');

// generate token and return it
// no password data
const generateToken = (user) => {
  if (!user) return null;

  const u = {
    userId: user._id,
    first_name: user.first_name,
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
    first_name: user.first_name,
    username: user.username,
  };
};

module.exports = { generateToken, getCleanUser };
