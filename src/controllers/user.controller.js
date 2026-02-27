class UserController {
	showHomepage(req, res) {
		res.render('homepage');
	}
}

module.exports = new UserController();
