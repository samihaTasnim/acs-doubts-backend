const createError = require('http-errors');
const mongoose = require('mongoose');

const Announcement = require('../Models/Announcement.model');

module.exports = {
  getAllAnnouncements: async (req, res, next) => {
    try {
      const results = await Announcement.find({} , { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewAnnouncement: async (req, res, next) => {
    try {
      const announcement = new Announcement(req.body);
      const result = await announcement.save();
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



  updateAAnnouncement: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Announcement.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Announcement does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Announcement Id'));
      }

      next(error);
    }
  },

  deleteAAnnouncement: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Announcement.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Announcement does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Announcement id'));
        return;
      }
      next(error);
    }
  }
};