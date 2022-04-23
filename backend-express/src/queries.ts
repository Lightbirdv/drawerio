import * as express from 'express';
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    database: 'drawerio',
    port:5432
});

const getUsers = (request: express.Request, response: express.Response) => {
    pool.query('SELECT * FROM users ORDER BY users_id ASC', (error: string, results: any) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}

module.exports = {
    pool,
    getUsers
};