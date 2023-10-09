const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },

  classTime: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  chapterTopic: {
    type: String,
    required: true
  },

  instructor: {
    type: String,
    required: true
  }
});

const Class = mongoose.model('class', ClassSchema);
module.exports = Class;
