const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./initDB')();

const ClassRoute = require('./Routes/Class.route');
const AnnouncementRoute = require('./Routes/Announcement.route');
app.use('/class', ClassRoute);
app.use('/announcement', AnnouncementRoute);

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
