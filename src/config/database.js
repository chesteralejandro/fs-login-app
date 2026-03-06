const { Pool } = require('pg');

class Database {
	constructor() {
		this.pool;
	}

	async connect() {
		try {
			this.pool = new Pool({
				connectionString: process.env.DATABASE_URL,
				ssl: {
					rejectUnauthorized: false,
				},
			});

			console.log('🟢 Success. Database is connected.');
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async selectUserById(userId) {
		const query =
			'SELECT id, first_name, last_name, email, password, created_at FROM users WHERE id = $1';

		const result = await this.pool.query(query, [userId]);

		const [userDetails] = result.rows;

		return userDetails || null;
	}

	async selectUserByEmail(userEmail) {
		const query =
			'SELECT id, first_name, last_name, email, password, created_at FROM users WHERE email = $1';

		const result = await this.pool.query(query, [userEmail]);

		const [userDetails] = result.rows;

		return userDetails || null;
	}

	async createUser(userData) {
		const query =
			'INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id';

		const { firstName, lastName, email, password } = userData;
		const values = [firstName, lastName, email, password];

		const result = await this.pool.query(query, values);

		const [firstInsert] = result.rows;

		return firstInsert.id;
	}
}

module.exports = new Database();
