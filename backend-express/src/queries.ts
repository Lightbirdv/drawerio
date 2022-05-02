import {default as config} from "../.dbsecret.json"
const Pool = require('pg').Pool;

const pool = new Pool({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.database,
    port: config.port
});



module.exports = {
    pool
};