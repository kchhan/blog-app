const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

const app = express();

// setup connection to MongoDB
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
// connect to MongoDB
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret: 'blogsecret', resave: false, saveUninitialized: true })
);
app.use(cookieParser('blogsecret'));
app.use(helmet());
app.use(compression()); // compress all routes

// setup passportjs
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// for the currentUser variable
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// create routes
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
