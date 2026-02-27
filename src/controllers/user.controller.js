const database = require('../config/database');
const { createHashedPassword } = require('../utils/bcrypt');

class UserController {
	processLogin(req, res) {
		const body = req.body;
		console.log(body);
	}

	async processRegistration(req, res) {
		const user = req.body;
		try {
			const userFound = await database.findUserByEmail(user.email);

			if (Boolean(userFound.length)) {
				throw new Error('Email already registered');
			}

			const hashedPassword = await createHashedPassword(user.password);

			await database.createUser({ ...user, password: hashedPassword });
		} catch (error) {
			console.error('❌', error.message);
			res.render('register-page', { error: error.message });
		}
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
