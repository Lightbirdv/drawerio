"use strict";
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    database: 'drawerio',
    port: 5432
});
module.exports = {
    pool
};
