class UserController {
	showHomepage(req, res) {
		res.render('homepage');
	}

	showLoginPage(req, res) {
		res.render('login-page');
	}

	showRegisterPage(req, res) {
		res.render('register-page');
	}
}

module.exports = new UserController();
