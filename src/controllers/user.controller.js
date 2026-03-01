const userModel = require('../models/user.model');

class UserController {
	async processLogin(req, res) {
		try {
			await userModel.login(req);
			res.redirect('/');
		} catch (error) {
			console.error('❌', error.message);
			req.session.inputValues = req.body;
			res.redirect('/login');
		}
	}

	processLogout(req, res) {
		userModel.logout(req);
		res.redirect('/login');
	}

	async processRegistration(req, res) {
		try {
			await userModel.register(req);
			res.redirect('/');
		} catch (error) {
			console.error('❌', error.message);
			req.session.inputValues = req.body;
			res.redirect('/register');
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
