const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const date = new Date()

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  added: { type: String, default: date, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', PostSchema);
