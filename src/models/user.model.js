const database = require('../config/database');
const { createHashedPassword, validatePassword } = require('../utils/bcrypt');

class UserModel {
	async login(req) {
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
		} catch (error) {
			throw new Error(error.message);
		}
	}

	logout(req) {
		req.session.destroy();
	}

	async register(req) {
		const user = req.body;

		try {
			const userArray = await database.selectUserByEmail(user.email);

			if (Boolean(userArray.length)) {
				req.flash('error', 'Email already registered');
				throw new Error('Email already registered');
			}

			const hashedPassword = await createHashedPassword(user.password);

			await database.createUser({ ...user, password: hashedPassword });

			const [registeredUser] = await database.selectUserByEmail(
				user.email,
			);

			req.session.user = { ...registeredUser };
			req.flash(
				'success',
				'Registration successful! Welcome to your dashboard.',
			);
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

module.exports = new UserModel();
