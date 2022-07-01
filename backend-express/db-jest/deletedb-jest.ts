import * as pg from "pg";
require("dotenv").config();

let client = new pg.Client({
	host: "localhost",
	user: process.env.USER,
	database: "postgres",
	password: process.env.PASSWORD,
	port: parseInt(process.env.PORT!) || 5432,
});

const execute = async () => {
	try {
		await client.connect();
		await client.query(`DROP DATABASE ${process.env.DBTEST}`);
		console.log("Database deleted successfully");
		await client.end();
		return true;
	} catch (err) {
		console.log(err);
	} finally {
		await client.end();
	}
};

execute().then((result) => {
	if (result) {
		console.log("Job successfully completed");
	}
});
