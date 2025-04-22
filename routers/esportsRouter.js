const express = require('express');
const router = express.Router();
const esportsController = require('../controllers/esportsController');

router.get('/valorant', esportsController.getValorantMatches);
router.get('/lol', esportsController.getLoLMatches);

module.exports = router;
