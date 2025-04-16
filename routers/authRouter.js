const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.patch('/send-verification-code', authController.sendVerificationCode);
router.patch('/verify-code', authController.verifyVerificationCode);

module.exports = router;