const express = require('express');
const router = express.Router();

const ClassController = require('../Controllers/Class.Controller');

router.get('/', ClassController.getAllClasses);

router.post('/', ClassController.createNewClass);

router.patch('/:id', ClassController.updateACLass);

router.delete('/:id', ClassController.deleteAClass);

module.exports = router;
