function getValidationError(validationErrors = [], field) {
	return validationErrors
		.map(({ msg, value, path }) => ({
			msg,
			value,
			path,
		}))
		.find((error) => error.path == field);
}

module.exports = getValidationError;
