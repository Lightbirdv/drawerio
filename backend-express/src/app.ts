import express from 'express'
const app = express()

require('dotenv').config();
const authRouter = require('./routes/authentication/authenticationRoutes')
const userRouter = require('./routes/user/userRoutes')
var bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var cors = require('cors')

const port = process.env.APIPORT || 5000;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Drawerio API',
            description: 'Drawerio backend API information',
            servers: ['http://localhost:5000']
        }
    },
    apis: ['src/app.ts','src/routes/*/*.ts']
}
console.log(process.cwd())
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send("Hello World");
})
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log("started");
})