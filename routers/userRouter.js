const express = require('express');
const router = require('express').Router();
const userController = require('../controllers/userController');
const {identifier} = require('../middlewares/identification');

router.get('/all-users', userController.getAllUsers);
router.get('/user-by-email', userController.getUserByEmail);
router.get('/user-by-role', userController.getUserByRole);
router.get('/user-by-id',userController.getUserById);

router.delete('/delete-user', identifier, userController.deleteUser);
router.put('/update-user',identifier, userController.updateUser);
module.exports = router;