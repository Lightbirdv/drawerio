import express from 'express'

const db = require('./queries')
const app = express()

app.get('/', (req, res) => {
    return res.send("Hello World");
})

app.get('/users', db.getUsers)

app.listen(3001, () => {
    console.log("started");
})