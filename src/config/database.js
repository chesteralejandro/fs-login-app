const mysql = require('mysql2/promise');

class Database {
	constructor() {
		this.connection;
	}

	async connect() {
		try {
			this.connection = await mysql.createConnection({
				host: process.env.DATABASE_HOST,
				user: process.env.DATABASE_USER,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
			});

			console.log('🟢 Success. Database is connected.');
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async selectUserById(userId) {
		const query =
			'SELECT id, first_name, last_name, email, password, created_at FROM users WHERE id = ?';

		const [result, _fields] = await this.connection.execute(query, [
			userId,
		]);

		const [userDetails] = result;

		return userDetails || {};
	}

	async selectUserByEmail(userEmail) {
		const query =
			'SELECT id, first_name, last_name, email, password, created_at FROM users WHERE email = ?';

		const [result, _fields] = await this.connection.execute(query, [
			userEmail,
		]);

		const [userDetails] = result;

		return userDetails || {};
	}

	async createUser(userData) {
		const query =
			'INSERT INTO `users`(`first_name`, `last_name`, `email`, `password`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, NOW(), NOW())';

		const { firstName, lastName, email, password } = userData;
		const values = [firstName, lastName, email, password];

		const [result, _fields] = await this.connection.execute(query, values);

		const { insertId } = result;

		return insertId;
	}
}

module.exports = new Database();
