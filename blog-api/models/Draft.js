const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DraftSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

module.exports = mongoose.model('Draft', DraftSchema);
