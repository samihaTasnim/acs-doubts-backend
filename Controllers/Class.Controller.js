const createError = require('http-errors');
const mongoose = require('mongoose');

const Class = require('../Models/Class.model');

module.exports = {
  getAllClasses: async (req, res, next) => {
    try {

      var arr = [];

      for(var i = 0; i < 7; i++) {
        const date = new Date(new Date().getTime() + (i*(24 * 60 * 60 * 1000)));
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        var ret = day + '' + month + '' + year;

        var tem_obj = {id: ret};
        arr[i] = tem_obj;
}
      const results = await Class.find({$or : arr} , { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewClass: async (req, res, next) => {
    try {
      const class_ = new Class(req.body);
      const result = await class_.save();
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



  updateACLass: async (req, res, next) => {
    try {
      const id = {id: req.params.id};
      const updates = req.body;
      const options = { new: true };

      const result = await Class.findOneAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Class does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Class Id'));
      }

      next(error);
    }
  },

  deleteAClass: async (req, res, next) => {
    const id = {id: req.params.id};
    try {
      const result = await Class.findOneAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Class does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Class id'));
        return;
      }
      next(error);
    }
  }
};
