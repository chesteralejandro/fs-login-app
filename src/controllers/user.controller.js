class UserController {
	showHomepage(req, res) {
		res.send('Hello from controller.');
	}
}

module.exports = new UserController();
