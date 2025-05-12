const express = require('express');
const { getNewsStats } = require('../controllers/analyticsController');
const router = express.Router();

router.get('/news-stats', getNewsStats);

module.exports = router;