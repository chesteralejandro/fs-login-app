function requireAuth(req, res, next) {
	if (!req.session.user) {
		req.flash('error', 'Please log in first');
		res.redirect('/login');
		return;
	}
	next();
}

module.exports = requireAuth;
