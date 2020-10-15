const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  added: { type: Date, default: Date.now().toLocaleTimeString() },
  comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', PostSchema);
