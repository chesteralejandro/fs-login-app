const express = require('express');

const router = express.Router();

const requireAuth = require('../middleware/authMiddleware');

const {
	registerValidation,
	loginValidation,
	handleValidationErrors,
} = require('../middleware/validation');
const userController = require('../controllers/user.controller');

router.get('/', requireAuth, userController.showDashboardPage);
router.get('/login', userController.showLoginPage);
router.get('/register', userController.showRegisterPage);
router.get('/logout', userController.processLogout);

router.post(
	'/register',
	registerValidation,
	handleValidationErrors('/register'),
	userController.processRegistration,
);
router.post(
	'/login',
	loginValidation,
	handleValidationErrors('/login'),
	userController.processLogin,
);

module.exports = router;
