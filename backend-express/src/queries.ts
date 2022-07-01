const Pool = require("pg").Pool;

const pool = new Pool({
	user: process.env.USER,
	password: process.env.PASSWORD,
	host: process.env.HOST,
	database: process.env.DB,
	port: process.env.PORT,
});

module.exports = {
	pool,
};
