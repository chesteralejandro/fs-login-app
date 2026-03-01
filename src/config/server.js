const http = require('node:http');

const database = require('./database');

class Server {
	async listen(app) {
		const server = http.createServer(app);
		try {
			await database.connect();

			server.listen(process.env.PORT, () => {
				console.log('🟢 Success. Server is listening.');
			});
		} catch (error) {
			console.error('🔴', error.message);
		}
	}
}

module.exports = new Server();
