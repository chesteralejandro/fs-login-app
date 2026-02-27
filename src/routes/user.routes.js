const express = require('express');

const router = express.Router();

const requireAuth = require('../middleware/authMiddleware');

const {
	registerValidation,
	loginValidation,
	handleValidationErrors,
} = require('../middleware/validation');
const userController = require('../controllers/user.controller');

router.get('/', userController.showLoginPage);
router.get('/register', userController.showRegisterPage);
router.get('/dashboard', requireAuth, userController.showDashboardPage);

router.post(
	'/register',
	registerValidation,
	handleValidationErrors('register-page'),
	userController.processRegistration,
);
router.post(
	'/login',
	loginValidation,
	handleValidationErrors('login-page'),
	userController.processLogin,
);

module.exports = router;
