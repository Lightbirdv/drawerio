import * as pg from 'pg';
require('dotenv').config();
const bcrypt = require('bcrypt');

let client = new pg.Client({
    host: 'localhost',
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT!) || 5432
});

const execute = async () => {
    try {
        await client.connect();
        let firstuser = await client.query(`INSERT INTO users (email,password,isAdmin) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`, ["seedtestadminuser", await bcrypt.hash("seedtestadminpassword",10), "true"]);
        console.log('Testadminuser created successfully');
        let seconduser = await client.query(`INSERT INTO users (email,password) VALUES ($1,$2) ON CONFLICT DO NOTHING`, ["seedtestuser", await bcrypt.hash("seedtestpassword",10)]);
        console.log('Testuser created successfully');
        let firstdrawer = await client.query('INSERT INTO drawer (drawerTitle, creationDate, users_id) VALUES ($1,$2,$3)   RETURNING *', ["testdrawer for adminuser", new Date(), 1]);
        console.log('First drawer created successfully');
        let seconddrawer = await client.query('INSERT INTO drawer (drawerTitle, creationDate, users_id) VALUES ($1,$2,$3)   RETURNING *', ["testdrawer for seeduser", new Date(), 2]);
        await client.query('INSERT INTO drawerentries(comment, creationDate, imageURL, drawer_id, originURL, selText) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', ["drawerentry for adminuser",new Date(), ["https://i.imgur.com/R8se5g1b.jpg", "https://i.imgur.com/JXetxQhb.jpg"], 1, "https://seedaddress.com", "lorem ipsum dolor sit amet"]);
        console.log('Table drawerentry created successfully');
        await client.query('INSERT INTO drawerentries(comment, creationDate, imageURL, drawer_id, originURL, selText) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', ["drawerentry for seeduser",new Date(), ["https://i.imgur.com/2bvab7yb.jpg", "https://i.imgur.com/icsm6L3b.jpg"], 2, "https://seedaddress.com", "lorem ipsum dolor sit amet"]);
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