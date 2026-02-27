const { body, validationResult } = require('express-validator');

/*
|--------------------------------------------------------------------------
| Register Validation Rules
|--------------------------------------------------------------------------
*/

const registerValidation = [
	body('firstName')
		.trim()
		.notEmpty()
		.withMessage('First name is required')
		.isLength({ min: 2 })
		.withMessage('First name must be at least 2 characters')
		.matches(/^[A-Za-z]+$/)
		.withMessage('First name must contain only letters'),

	body('lastName')
		.trim()
		.notEmpty()
		.withMessage('Last name is required')
		.isLength({ min: 2 })
		.withMessage('Last name must be at least 2 characters')
		.matches(/^[A-Za-z]+$/)
		.withMessage('Last name must contain only letters'),

	body('email')
		.trim()
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Please enter a valid email')
		.normalizeEmail(),

	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),

	body('confirmPassword')
		.notEmpty()
		.withMessage('Please confirm your password')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords do not match');
			}
			return true;
		}),
];

/*
|--------------------------------------------------------------------------
| Login Validation Rules
|--------------------------------------------------------------------------
*/

const loginValidation = [
	body('email')
		.trim()
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Please enter a valid email')
		.normalizeEmail(),

	body('password').notEmpty().withMessage('Password is required'),
];

/*
|--------------------------------------------------------------------------
| Handle Validation
|--------------------------------------------------------------------------
*/

const handleValidationErrors = (viewName) => {
	return (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render(viewName, {
				errors: errors.array(),
				oldInput: req.body,
			});
			return;
		}

		next();
	};
};

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

module.exports = {
	registerValidation,
	loginValidation,
	handleValidationErrors,
};
