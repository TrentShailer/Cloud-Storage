const { Pool } = require("pg");

const pool = new Pool({
	user: process.env.DBUSER,
	host: "0.0.0.0",
	database: process.env.DB,
	password: process.env.DBPASS,
	port: process.env.DBPORT,
});

async function Connect() {
	return new Promise(async (resolve) => {
		var tries = 20;
		while (tries > 0) {
			try {
				tries--;
				const client = await pool.connect();
				resolve(client);
				break;
			} catch (err) {
				console.log(`Failed to connect to database, ${tries} tries remaining`);
				await new Promise((res) => setTimeout(res, 5000));
			}
		}
		resolve(-1);
	});
}

async function query(sql, params = []) {
	const client = await Connect();
	if (client === -1) {
		console.error("Failed to connect to database");
		return -3;
	}

	try {
		const res = await client.query(sql, params);

		if (res == null || res.rowCount === 0) {
			client.release();
			return -1;
		}
		client.release();
		return res;
	} catch (err) {
		console.log({ error: err.message, sql: sql, params: params });
		client.release();
		return -2;
	}
}

module.exports.query = query;
