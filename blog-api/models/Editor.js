const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EditorSchema = new Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  drafts: [{ type: Schema.Types.ObjectId, ref: 'Draft' }],
});

module.exports = mongoose.model('Editor', EditorSchema);