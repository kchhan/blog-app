const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const date = new Date();

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  added: { type: Date, default: date },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = mongoose.model('Comment', CommentSchema);
