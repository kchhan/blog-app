const Draft = require('../models/Draft');

const jwt = require('jsonwebtoken');
require('dotenv').config();

// GET all drafts
exports.drafts_get = (req, res, next) => {
  Draft.find({}).exec((err, drafts_data) => {
    if (err) {
      return next(err);
    } else {
      return res.send(drafts_data);
    }
  });
};

// GET post form for new draft
exports.draft_create_get = (req, res, next) => {
  // React renders a new blog draft post form
};

// POST save draft
exports.draft_create_post = (req, res, next) => {
  jwt.verify(req.body.token, process.env.SECRET, (err, authData) => {
    if (err) {
      // token does not match. send forbidden status
      res.sendStatus(403);
    } else {
      // token matches. create draft
      const draft = new Draft({
        title: req.body.data.title,
        body: req.body.data.body,
      });

      // save new draft and send status back to react
      draft.save((err) => {
        if (err) {
          return res.send({ error: err, status: 'error' });
        } else {
          return res.send({
            title: draft.title,
            status: 'success',
          });
        }
      });
    }
  });
};

// GET form for update blog draft
exports.draft_update_get = (req, res, next) => {
  Draft.findById(req.params.id).exec((err, draft_data) => {
    if (err) return next(err);
    if (draft_data === null) {
      const error = new Error('Draft not found');
      return res.send({
        error: error,
      });
    }
    // successful
    return res.send(draft_data);
  });
};

// POST update draft
exports.draft_update_post = (req, res, next) => {
  jwt.verify(req.body.token, process.env.SECRET, (err, authData) => {
    if (err) {
      // token does not match. send forbidden status
      res.sendStatus(403);
    } else {
      // token matches. update draft
      Draft.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.data.title,
            body: req.body.data.body,
          },
        },
        (err, result) => {
          if (err) console.log(err);
          else res.send({ message: 'success' });
        }
      );
    }
  });
};

// GET request for deleting draft
exports.draft_delete_get = (req, res, next) => {};

// POST delete draft
exports.draft_delete_post = (req, res, next) => {};
