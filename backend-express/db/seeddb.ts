import * as pg from 'pg';
require('dotenv').config();

let client = new pg.Client({
    host: 'localhost',
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT!) || 5432
});

