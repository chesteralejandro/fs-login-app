const mysql = require('mysql2/promise');

class Database {
	async connect() {
		try {
			await mysql.createConnection({
				host: process.env.DATABASE_HOST,
				user: process.env.DATABASE_USER,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
			});

			console.log('✅ Success. Database is connected.');
		} catch (error) {
			throw new Error(error.message);
		}
	}
}

module.exports = new Database();
