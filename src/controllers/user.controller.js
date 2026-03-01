const userModel = require('../models/user.model');
const URL_ROUTES = require('../constants/URL_ROUTES');

class UserController {
	async processLogin(req, res) {
		try {
			await userModel.login(req);
			res.redirect(URL_ROUTES.DASHBOARD);
		} catch (error) {
			console.error('🔴', error.message);
			req.session.inputValues = req.body;
			res.redirect(URL_ROUTES.LOGIN);
		}
	}

	processLogout(req, res) {
		userModel.logout(req);
		res.redirect(URL_ROUTES.LOGIN);
	}

	async processRegistration(req, res) {
		try {
			await userModel.register(req);
			res.redirect(URL_ROUTES.DASHBOARD);
		} catch (error) {
			console.error('🔴', error.message);
			req.session.inputValues = req.body;
			res.redirect(URL_ROUTES.REGISTER);
		}
	}

	showLoginPage(req, res) {
		const pageValues = userModel.validateLoginPage(req);
		res.render('login-page', { ...pageValues });
	}

	showRegisterPage(req, res) {
		const pageValues = userModel.validateRegisterPage(req);
		res.render('register-page', { ...pageValues });
	}

	showDashboardPage(req, res) {
		res.render('dashboard', { user: req.session.user });
	}
}

module.exports = new UserController();
