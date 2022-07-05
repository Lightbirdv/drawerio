"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request = require("supertest");
const app = (0, express_1.default)();
require("dotenv").config();
const authRouter = require("./routes/authentication/authenticationRoutes");
const userRouter = require("./routes/user/userRoutes");
const userFunctions = require("./routes/user/userFunctions");
const drawerRouter = require("./routes/drawer/drawerRoutes");
const drawerentryRouter = require("./routes/drawerentries/drawerentryRoutes");
var bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fileupload = require("express-fileupload");
var cors = require("cors");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Drawerio",
            version: "1.0.0",
            description: "This API is used to provide the functionality of the Drawerio application",
        },
        basePath: "/",
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        //   security: [{
        //     bearerAuth: []
        //   }]
    },
    apis: ["src/app.ts", "src/routes/*/*.ts"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(fileupload());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
userFunctions.registerAdmin();
app.get("/", (req, res) => {
    return res.redirect("/api-docs");
});
app.get("/test", (req, res) => {
    return res.sendStatus(200);
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/drawer", drawerRouter);
app.use("/drawerentry", drawerentryRouter);
app.use(error_middleware_1.default);
module.exports = app;
