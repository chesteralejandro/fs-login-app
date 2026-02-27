class UserController {
	processRegistration(req, res) {
		const body = req.body;
		console.log(body);
	}

	showLoginPage(req, res) {
		res.render('login-page');
	}

	showRegisterPage(req, res) {
		res.render('register-page');
	}

	showDashboardPage(req, res) {
		res.render('dashboard');
	}
}

module.exports = new UserController();
