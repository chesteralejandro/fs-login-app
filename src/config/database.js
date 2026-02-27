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

			console.log('✅ Success. Database is connected.');
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async selectUserByEmail(userEmail) {
		const query =
			'SELECT id, first_name, last_name, email, password FROM users WHERE email = ?';
		const [userArray] = await this.connection.execute(query, [userEmail]);

		return userArray;
	}

	async createUser(userData) {
		const query =
			'INSERT INTO `users`(`first_name`, `last_name`, `email`, `password`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, NOW(), NOW())';

		const { firstName, lastName, email, password } = userData;
		const values = [firstName, lastName, email, password];

		const [result, fields] = await this.connection.execute(query, values);

		console.log(result, fields);
	}
}

module.exports = new Database();
