const Pool = require("pg").Pool;
console.log(process.env.POSTGRES_USER)
console.log(process.env.POSTGRES_PASSWORD)
const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.HOST,
	database: process.env.DB,
	port: process.env.PORT,
});

module.exports = {
	pool,
};
