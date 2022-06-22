import * as pg from 'pg';
require('dotenv').config();

const { databasequery, tableuserquery, tabledrawerquery, tabledrawerentriesquery } = require('./database-jest.ts');

let masterclient = new pg.Client({
    host: 'localhost',
    database: 'postgres',
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT!) || 5432
});

let client = new pg.Client({
    host: 'localhost',
    database: process.env.DBTEST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT!) || 5432
});

const execute = async () => {
    try {
        await masterclient.connect();
        await masterclient.query(databasequery);
        console.log('Database created successfully');
        await masterclient.end();
        await client.connect();
        await client.query(tableuserquery);
        console.log('Table user created successfully');
        await client.query(tabledrawerquery);
        console.log('Table drawer created successfully');
        await client.query(tabledrawerentriesquery);
        console.log('Table drawerentry created successfully');
        await client.end();
        return true;
    } catch (err) {
        console.log(err);
    } finally {
        await client.end();
    }
};

execute().then(result => {
    if (result) {
        console.log('Job successfully completed');
    }
});