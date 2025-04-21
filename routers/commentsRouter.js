const express = require('express');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

router.get('/load-comment', commentsController.loadComments);
router.post('/publish-comment', commentsController.publishComment);

module.exports = router; 