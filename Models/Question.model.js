const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  paper: {
    type: Number,
    required: true
  },
  chapter: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  }, 
  question: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
});

const Question = mongoose.model('question', QuestionSchema);
module.exports = Question;
