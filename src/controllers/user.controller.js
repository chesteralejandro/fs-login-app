const database = require('../config/database');
const { createHashedPassword, validatePassword } = require('../utils/bcrypt');

class UserController {
	async processLogin(req, res) {
		const user = req.body;

		try {
			const userArray = await database.selectUserByEmail(user.email);

			if (!Boolean(userArray.length)) {
				throw new Error('No User Found');
			}

			const [userFound] = userArray;
			const passwordValid = await validatePassword(
				user.password,
				userFound.password,
			);

			if (!passwordValid) {
				throw new Error('Invalid Credentials');
			}

			req.session.user = { ...userFound };

			res.redirect('/dashboard');
		} catch (error) {
			console.error('❌', error.message);
			res.render('login-page', { error: error.message });
		}
	}

	processLogout(req, res) {
		req.session.destroy(() => {
			res.redirect('/');
		});
	}

	async processRegistration(req, res) {
		const user = req.body;
		try {
			const userArray = await database.selectUserByEmail(user.email);

			if (Boolean(userArray.length)) {
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
