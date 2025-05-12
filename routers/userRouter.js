const express = require('express');
const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/all-users', userController.getAllUsers);
router.get('/user-by-email', userController.getUserByEmail);
router.get('/user-by-role', userController.getUserByRole);
router.get('/user-profile', userController.getUserProfile);

module.exports = router;