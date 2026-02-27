const database = require('../config/database');
const { createHashedPassword, validatePassword } = require('../utils/bcrypt');

class UserController {
	async processLogin(req, res) {
		const user = req.body;

		try {
			const userArray = await database.selectUserByEmail(user.email);

			if (!Boolean(userArray.length)) {
				req.flash('error', 'Invalid email or password');
				throw new Error('No User Found');
			}

			const [userFound] = userArray;
			const passwordValid = await validatePassword(
				user.password,
				userFound.password,
			);

			if (!passwordValid) {
				req.flash('error', 'Invalid email or password');
				throw new Error('Invalid Credentials');
			}

			req.session.user = { ...userFound };

			req.flash('success', 'Welcome back!');
			res.redirect('/dashboard');
		} catch (error) {
			console.error('❌', error.message);
			res.redirect('/');
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
				req.flash('error', 'Email already registered');
				throw new Error('Email already registered');
			}

			const hashedPassword = await createHashedPassword(user.password);

			await database.createUser({ ...user, password: hashedPassword });

			req.flash(
				'success',
				'Registration successful! You can now log in.',
			);
			res.redirect('/login');
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
