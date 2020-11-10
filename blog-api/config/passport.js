const User = require('../models/User');
const Editor = require('../models/Editor');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function SessionConstructor(userId, userGroup, details) {
  this.userId = userId;
  this.userGroup = userGroup;
  this.details = details;
}

passport.use(
  'local',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        return done(null, false, {
          message: 'Incorrect username or password',
        });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return done(err);

        if (result) {
          // return user
          return done(null, user, { message: 'Logged In successfully' });
        } else {
          // no user found
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  })
);

passport.use(
  'editor-local',
  new LocalStrategy((username, password, done) => {
    Editor.findOne({ username: username }, (err, editor) => {
      if (err) return done(err);

      if (!editor) {
        return done(null, false, {
          message: 'Incorrect username or password',
        });
      }

      bcrypt.compare(password, editor.password, (err, result) => {
        if (err) return done(err);

        if (result) {
          // return editor
          return done(null, editor, { message: 'Logged In successfully' });
        } else {
          // no editor found
          return done(null, false, { message: 'Incorrect passowrd' });
        }
      });
    });
  })
);

const jwtOpts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: process.env.SECRET,
};

passport.use(
  'jwt',
  new JWTStrategy(jwtOpts, function (jwtPayload, done) {
    // find the user in db if needed
    return User.findOneById(jwtPayload.id)
      .then((user) => {
        return done(null, user); // user found in db in passport
      })
      .catch((err) => {
        return done(err); // user not found in db
      });
  })
);

passport.use(
  'editor-jwt',
  new JWTStrategy(jwtOpts, function (jwtPayload, done) {
    // find the editor in db if needed
    return Editor.findOneById({ id: jwtPayload.sub })
      .then((user) => {
        return done(null, user); // editor found in db in passport
      })
      .catch((err) => {
        return done(err); // editor not found in db
      });
  })
);

passport.serializeUser(function (userObject, done) {
  let userGroup = 'User';
  let userPrototype = Object.getPrototypeOf(userObject);

  if (userPrototype === User.prototype) {
    userGroup = 'User';
  } else if (userPrototype === Editor.prototype) {
    userGroup = 'Editor';
  }

  let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
  done(null, sessionConstructor);
});

passport.deserializeUser(function (sessionConstructor, done) {
  if (sessionConstructor.userGroup == 'User') {
    User.findOne(
      {
        _id: sessionConstructor.userId,
      },
      '-localStrategy.password',
      function (err, user) {
        done(err, user);
      }
    );
  } else if (sessionConstructor.userGroup == 'Editor') {
    Editor.findOne(
      {
        _id: sessionConstructor.userId,
      },
      '-localStrategy.password',
      function (err, user) {
        done(err, user);
      }
    );
  }
});
