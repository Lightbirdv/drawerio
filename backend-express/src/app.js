"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const userRouter = require('./routes/user/userRoutes');
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('../swagger.json');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    return res.send("Hello World");
});
app.use('/user', userRouter);
app.listen(3001, () => {
    console.log("started");
});
