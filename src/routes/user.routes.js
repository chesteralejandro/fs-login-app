const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.showLoginPage);
router.get('/register', userController.showRegisterPage);
router.get('/dashboard', userController.showDashboardPage);

router.post('/register', userController.processRegistration);

module.exports = router;
