const http = require('node:http');

class Server {
	listen(app) {
		const server = http.createServer(app);

		server.listen(process.env.PORT, () => {
			console.log('✅ Success. Server is listening.');
		});
	}
}

module.exports = new Server();
