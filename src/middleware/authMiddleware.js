const URL_ROUTES = require('../constants/URL_ROUTES');

function requireAuth(req, res, next) {
	if (!req.session.user) {
		req.flash('error', 'Please log in first');
		res.redirect(URL_ROUTES.LOGIN);
		return;
	}
	next();
}

module.exports = requireAuth;
