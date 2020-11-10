const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const draftRouter = require('./routes/drafts');

const app = express();

// setup connection to MongoDB
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
// connect to MongoDB
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// add middleware
require('./config/passport');

app.use(
  cors({
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(compression()); // compress all routes
app.use(passport.initialize());

// create routes
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/drafts', draftRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;
