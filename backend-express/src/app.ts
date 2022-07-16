import express from "express";
import errorMiddleware from "./middleware/error.middleware";
const request = require("supertest");
const app = express();
const authRouter = require("./routes/authentication/authenticationRoutes");
const userRouter = require("./routes/user/userRoutes");
const userFunctions = require("./routes/user/userFunctions");
const drawerRouter = require("./routes/drawer/drawerRoutes");
const drawerentryRouter = require("./routes/drawerentries/drawerentryRoutes");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fileupload = require("express-fileupload");
var cors = require("cors");
require("dotenv").config();


if (!process.env.NODE_ENV) {
	throw new Error("NODE_ENV is not set")
}

if (process.env.NODE_ENV == "development") {
	var swaggerOptions = {
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
		},
		apis: ["./src/app.ts", "./src/routes/*/*.ts"],
	};
}

if (process.env.NODE_ENV == "production") {
	var swaggerOptions = {
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
		},
		apis: ["./dist/src/app.js", "./dist/src/routes/*/*.js"],
	};
}

app.use(cors());
app.use(fileupload());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());

userFunctions.registerAdmin();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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

app.use(errorMiddleware);

module.exports = app;
