"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require('dotenv').config();
const authRouter = require('./routes/authentication/authenticationRoutes');
const userRouter = require('./routes/user/userRoutes');
const userFunctions = require('./routes/user/userFunctions');
const drawerRouter = require('./routes/drawer/drawerRoutes');
const drawerentryRouter = require('./routes/drawerentries/drawerentryRoutes');
var bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var cors = require('cors');
const port = process.env.APIPORT || 5000;
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'Your API title',
            version: '1.0.0',
            description: 'Your API description'
        },
        basePath: '/',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        //   security: [{
        //     bearerAuth: []
        //   }]
    },
    apis: ['src/app.ts', 'src/routes/*/*.ts'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
userFunctions.registerAdmin();
app.get('/', (req, res) => {
    return res.send("Hello World");
});
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/drawer', drawerRouter);
app.use('/drawerentry', drawerentryRouter);
app.listen(port, () => {
    console.log("started");
});
