const createError = require('http-errors');
const mongoose = require('mongoose');

const Question = require('../Models/Question.model');

module.exports = {
  getAllQuestions: async (req, res, next) => {
    try {
      var arr = [];
//       for(var i = 0; i < 7; i++) {
//         const date = new Date(new Date().getTime() - (i*(24 * 60 * 60 * 1000)));
//         var day = date.getDate();
//         var month = date.getMonth() + 1;
//         var year = date.getFullYear();

//         var ret = day + '' + month + '' + year;

//         var tem_obj = {id: ret};
//         arr[i] = tem_obj;
// }
      const results = await Question.find({});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  getAQuestion: async (req, res, next ) => {
    try {
      const id = {id: req.params.id}
      const result = await Question.findOne(id);
      if (!result) {
        throw createError(404, 'Question does not exist');
      }
      res.send(result);
    }
    catch(error) {
      console.log(error);
    }
  },

  createNewQuestion: async (req, res, next) => {
    try {
      const question_ = new Question(req.body);
      const result = await question_.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },



  updateQuestion: async (req, res, next) => {
    try {
      const id = {id: req.params.id};
      const updates = req.body;
      const options = { new: true };

      const result = await Question.findOneAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'question does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid question Id'));
      }

      next(error);
    }
  },

  deleteQuestion: async (req, res, next) => {
    const id = {id: req.params.id};
    try {
      const result = await Question.findOneAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'question does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid question id'));
        return;
      }
      next(error);
    }
  }
};
