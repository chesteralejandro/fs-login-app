const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.showHomepage);
router.get('/login', userController.showLoginPage);
router.get('/register', userController.showRegisterPage);

module.exports = router;
