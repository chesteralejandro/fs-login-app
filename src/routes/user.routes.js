const express = require('express');

const router = express.Router();

const URL_ROUTES = require('../constants/URL_ROUTES');
const {
	registerValidation,
	loginValidation,
	handleValidationErrors,
} = require('../middleware/validation');
const requireAuth = require('../middleware/authMiddleware');
const userController = require('../controllers/user.controller');

router.get(URL_ROUTES.DASHBOARD, requireAuth, userController.showDashboardPage);
router.get(URL_ROUTES.LOGIN, userController.showLoginPage);
router.get(URL_ROUTES.REGISTER, userController.showRegisterPage);
router.get(URL_ROUTES.LOGOUT, userController.processLogout);

router.post(
	URL_ROUTES.REGISTER,
	registerValidation,
	handleValidationErrors(URL_ROUTES.REGISTER),
	userController.processRegistration,
);
router.post(
	URL_ROUTES.LOGIN,
	loginValidation,
	handleValidationErrors(URL_ROUTES.LOGIN),
	userController.processLogin,
);

module.exports = router;
