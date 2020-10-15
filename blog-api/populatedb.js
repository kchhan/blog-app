// this script populates test items (will be deleted in database later)

// get arguments passed on the command line
const userArgs = process.argv.slice(2);

const async = require('async');

const User = require('./models/User');
const Post = require('./models/Post');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

const users = [];
const posts = [];

function userCreate(first_name, last_name, username, password, cb) {
  let userDetail = {
    first_name,
    last_name,
    username,
    password,
  };

  const user = new User(userDetail);

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New User: ${user}`);
    users.push(user);
    cb(null, user);
  });
}

const postCreate = (title, body, cb) => {
  const added = new Date().toLocaleDateString();

  let postDetail = { title, body, added };

  const post = new Post(postDetail);

  post.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Post: ${post}`);
    posts.push(post);
    cb(null, post);
  });
};

// creates initial items to populate database
const createUsers = (cb) => {
  async.parallel(
    [
      (callback) => {
        userCreate('First1', 'Last1', 'user1', 'password1', callback);
      },
      (callback) => {
        userCreate('First2', 'Last2', 'user2', 'password2', callback);
      },
      (callback) => {
        userCreate('First3', 'Last3', 'user3', 'password3', callback);
      },
    ],
    // optional callback
    cb
  );
};

const createPosts = (cb) => {
  async.parallel(
    [
      (callback) => {
        postCreate(
          'Loren ipsum 1',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec enim sem, vehicula ut lectus quis, pretium mattis lacus. Donec a viverra lacus. Mauris feugiat purus sit amet erat consequat, ac dapibus lectus aliquam. Suspendisse consequat a justo et tincidunt. Duis congue quis est vitae aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis feugiat eros orci, et interdum nulla auctor quis',
          callback
        );
      },
      (callback) => {
        postCreate(
          'Lorem ipsum 2',
          'Quisque fringilla efficitur arcu sed suscipit. Curabitur convallis, mauris et interdum consequat, eros est consequat elit, eu condimentum nunc odio vitae mauris. Maecenas sit amet ultrices lorem. Ut laoreet venenatis metus vel ultricies. Quisque maximus blandit egestas. Curabitur sed mi eget enim egestas venenatis. Vestibulum id sapien ut lacus efficitur ultricies in id leo. Nulla facilisi. Vivamus eu magna non magna suscipit pretium vitae at lacus.',
          callback
        );
      },
      (callback) => {
        postCreate(
          'Lorem ipsum 3',
          'Nunc ut quam quis turpis malesuada porttitor sollicitudin a massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla non fringilla justo. Aliquam semper nisi ac erat rutrum, et lobortis enim aliquet. Pellentesque nec accumsan tellus, vitae placerat dolor. Aenean aliquet libero nec urna euismod lobortis eget at ante. In iaculis consectetur neque ut elementum. Etiam non tortor ut felis commodo ultricies at at leo. Aenean lectus urna, vehicula at cursus at, viverra mattis arcu. Nunc sit amet eleifend felis. Integer ullamcorper eu ligula fringilla gravida. Vivamus laoreet diam erat, et dignissim sapien elementum quis. Curabitur elementum iaculis velit a rhoncus. Proin at fringilla urna, at egestas magna.',
          callback
        );
      },
    ],
    // optional callback
    cb
  );
};

async.parallel(
  [createUsers, createPosts],
  //optional callback
  (err, results) => {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    // all done, disconnect from database
    console.log('DONE CREATING ITEMS');
    mongoose.connection.close();
  }
);
