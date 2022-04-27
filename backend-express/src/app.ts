import express from 'express'

const app = express()

const userRouter = require('./routes/user/userRoutes')
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send("Hello World");
})

app.use('/user', userRouter);

app.listen(3001, () => {
    console.log("started");
})