const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const date = new Date().toLocaleDateString();

const CommentSchema = new Schema({
  message: { type: String, required: true },
  added: { type: Date, default: date },
  post: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
