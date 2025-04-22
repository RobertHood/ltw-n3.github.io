const express = require('express');
const commentsController = require('../controllers/commentsController');
const { identifier } = require('../middlewares/identification');
const router = express.Router();

router.get('/load-comment', commentsController.loadAllComments);
router.get('/load-comment-post', commentsController.loadCommentsinPost);

router.post('/publish-comment', commentsController.publishComment);
router.delete('/delete-comment', commentsController.deleteComments);

module.exports = router; 