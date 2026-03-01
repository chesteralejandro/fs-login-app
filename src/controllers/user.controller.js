const userModel = require('../models/user.model');

class UserController {
	async processLogin(req, res) {
		try {
			await userModel.login(req);
			res.redirect('/dashboard');
		} catch (error) {
			console.error('❌', error.message);
			res.redirect('/');
		}
	}

	processLogout(req, res) {
		userModel.logout(req);
		res.redirect('/');
	}

	async processRegistration(req, res) {
		try {
			await userModel.register(req);
			res.redirect('/dashboard');
		} catch (error) {
			console.error('❌', error.message);
			res.redirect('/register');
		}
	}

	showLoginPage(req, res) {
		res.render('login-page');
	}

	showRegisterPage(req, res) {
		res.render('register-page');
	}

	showDashboardPage(req, res) {
		res.render('dashboard', { user: req.session.user });
	}
}

module.exports = new UserController();
