const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema({

  notice: {
    type: String,
    required: true
  }
});

const Announcement = mongoose.model('announcement', AnnouncementSchema);
module.exports = Announcement;
