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
		while (tries) {
			try {
				const client = await pool.connect();
				resolve(client);
				break;
			} catch (err) {
				tries--;
				console.log(`Failed to connect to database, ${tries} tries remaining`);
				await new Promise((res) => setTimeout(res, 7500));
			}
		}
		resolve(-1);
	});
}

async function query (sql, params) {
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
		console.log({ result: "Error executing query", sql: sql, params: params });
		console.error(err.stack);
		client.release();
		return -2;
	}
};

module.exports.query = query;
