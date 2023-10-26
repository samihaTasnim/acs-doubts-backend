const express = require('express');
const router = express.Router();

const QuestionController = require('../Controllers/Question.Controller');

router.get('/', QuestionController.getAllQuestions);

router.get('/:id', QuestionController.getAQuestion);

router.post('/', QuestionController.createNewQuestion);

router.patch('/:id', QuestionController.updateQuestion);

router.delete('/:id', QuestionController.deleteQuestion);


module.exports = router;
