const express = require('express');
const router = express.Router();

// GET all posts
router.get('/', function (req, res, next) {
  console.log(req.session)
  res.send('<h1>Hello World (session)</h1>');
});

module.exports = router;
