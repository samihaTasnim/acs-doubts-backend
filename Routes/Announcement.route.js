const express = require('express');
const router = express.Router();

const AnnouncementController = require('../Controllers/Announcement.Controller');

router.get('/', AnnouncementController.getAllAnnouncements);

router.post('/', AnnouncementController.createNewAnnouncement);

router.patch('/:id', AnnouncementController.updateAAnnouncement);

router.delete('/:id', AnnouncementController.deleteAAnnouncement);


module.exports = router;
