const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: { type: String, required: true },
  added: { type: Date, default: Date.now().toLocaleString() },
  post: { type: Schema.ObjectId },
});

module.exports = mongoose.model('Comment', CommentSchema);
