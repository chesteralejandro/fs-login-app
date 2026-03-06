const database = require('../config/database');
const { createHashedPassword, validatePassword } = require('../utils/bcrypt');
const getValidationError = require('../utils/getValidationError');

class UserModel {
	async login(req) {
		const user = req.body;

		try {
			const userDetails = await database.selectUserByEmail(user.email);

			if (!userDetails) {
				req.flash('error', 'Invalid email or password');
				throw new Error('No User Found');
			}

			const passwordIsValid = await validatePassword(
				user.password,
				userDetails.password,
			);

			if (!passwordIsValid) {
				req.flash('error', 'Invalid email or password');
				throw new Error('Invalid Credentials');
			}

			req.session.user = { ...userDetails };
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
			const userDetails = await database.selectUserByEmail(user.email);

			if (userDetails) {
				req.flash('error', 'Email already registered');
				throw new Error('Email already registered');
			}

			const hashedPassword = await createHashedPassword(user.password);

			const newUserId = await database.createUser({
				...user,
				password: hashedPassword,
			});

			const newUserDetails = await database.selectUserById(newUserId);

			req.session.user = { ...newUserDetails };
			req.flash(
				'success',
				'Registration successful! Welcome to your dashboard.',
			);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	validateLoginPage(req) {
		const validationErrors = req.session.validationErrors;
		const inputValues = req.session.inputValues;

		const emailError = getValidationError(validationErrors, 'email');
		const passwordError = getValidationError(validationErrors, 'password');

		const emailValue =
			inputValues?.email.charAt(0) == '@'
				? inputValues?.email.slice(1)
				: inputValues?.email;

		delete req.session.validationErrors;
		delete req.session.inputValues;

		const pageValues = { emailError, emailValue, passwordError };

		return pageValues;
	}

	validateRegisterPage(req) {
		const validationErrors = req.session.validationErrors;
		const inputValues = req.session.inputValues;

		const firstNameError = getValidationError(
			validationErrors,
			'firstName',
		);
		const lastNameError = getValidationError(validationErrors, 'lastName');
		const emailError = getValidationError(validationErrors, 'email');
		const passwordError = getValidationError(validationErrors, 'password');
		const confirmPasswordError = getValidationError(
			validationErrors,
			'confirmPassword',
		);

		const firstNameValue = inputValues?.firstName;
		const lastNameValue = inputValues?.lastName;
		const emailValue =
			inputValues?.email.charAt(0) == '@'
				? inputValues?.email.slice(1)
				: inputValues?.email;
		const passwordValue = inputValues?.password;
		const confirmPasswordValue = inputValues?.confirmPassword;

		delete req.session.validationErrors;
		delete req.session.inputValues;

		const pageValues = {
			firstNameError,
			lastNameError,
			emailError,
			passwordError,
			confirmPasswordError,
			firstNameValue,
			lastNameValue,
			emailValue,
			passwordValue,
			confirmPasswordValue,
		};

		return pageValues;
	}
}

module.exports = new UserModel();
