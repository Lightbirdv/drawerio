import express from "express";
const pool = require("../../queries").pool;
const drawerFunctions = require("../drawer/drawerFunctions");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Sib = require("sib-api-v3-sdk");
import HttpException from "../../exceptions/HttpException";
import { User } from "./user";

async function getUsers(req: express.Request, res: express.Response) {
	const users = pool.query("SELECT * FROM users ORDER BY users_id ASC");
	return users;
}

async function getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
	const result = await pool.query("SELECT * FROM users WHERE users_id=$1", [req.params.id]);
	if (result.rowCount == 0) {
		return next(new HttpException(404, "User not found"));
	}
	let user: User = {
		users_id: result.rows[0].users_id,
		email: result.rows[0].email,
		password: result.rows[0].password,
		isAdmin: result.rows[0].isadmin,
		refreshtoken: result.rows[0].refreshtoken,
		forgottoken: result.rows[0].forgottoken,
		forgotExpires: result.rows[0].forgotexpires,
		confirmationtoken: result.rows[0].confirmationtoken,
		enabled: result.rows[0].enabled,
	};
	return user;
}

async function getUserByEmail(email: string, res: express.Response, next: express.NextFunction) {
	const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
	return user;
}

async function getUserByForgotToken(forgotToken: string) {
	const result = await pool.query("SELECT * FROM users WHERE forgotToken=$1", [forgotToken]);
	return result;
}

async function getUserByConfirmToken(confirmationToken: string) {
	const result = await pool.query("SELECT * FROM users WHERE confirmationToken=$1", [confirmationToken]);
	return result;
}

async function updateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
	const user: User | void = await getUser(req, res, next);
	if (!user) {
		return next();
	}
	const newUser = pool.query("UPDATE users SET email=$1, password=$2 WHERE users_id=$3", [
		req.body.email != null && req.body.email.length ? req.body.email : user.email,
		req.body.password != null && req.body.password.length ? await hashPassword(req.body.password) : user.password,
		req.params.id,
	]);
	return newUser;
}

async function updateForgotUser(req: express.Request, forgotToken: string, password: string) {
	const result = await pool.query("UPDATE users SET forgotToken=$1, forgotExpires=$2, password=$3 WHERE forgotToken=$4", [
		"",
		null,
		await hashPassword(password),
		forgotToken,
	]);
	return result;
}

async function activateUserAccount(user: User) {
	const result = await pool.query("UPDATE users SET enabled=$1, confirmationToken=$2 WHERE email=$3", [true, "", user.email]);
	return result;
}

async function insertRefreshToken(user: User, refreshToken: string) {
	const updatedUser = pool.query("UPDATE users SET refreshToken=$1 WHERE users_id=$2", [refreshToken, user.users_id]);
	return updatedUser;
}

async function insertForgotToken(email: string, forgotToken: string, forgotExpires: Date) {
	const updatedUser = pool.query("UPDATE users SET forgotToken=$1, forgotExpires=$2 WHERE email=$3", [forgotToken, forgotExpires, email]);
	return updatedUser;
}

async function insertConfirmToken(email: string, confirmToken: string) {
	const updatedUser = pool.query("UPDATE users SET confirmationToken=$1 WHERE email=$2", [confirmToken, email]);
	return updatedUser;
}

async function deleteUser(req: express.Request, res: express.Response) {
	const user = pool.query("DELETE FROM users WHERE users_id=$1", [req.params.id]);
	return user;
}

async function registerUser(req: express.Request, res: express.Response) {
	var user: User = req.body;
	user.password = await hashPassword(user.password);
	var newUser = await pool.query("INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *", [user.email, user.password]);
	if (!newUser) {
		return null;
	}
	newUser = newUser.rows[0];
	const defaultDrawer = await drawerFunctions.addDefaultDrawer(newUser.users_id);
	if (!defaultDrawer) {
		return null;
	}
	return newUser;
}

async function registerAdmin() {
	await pool.query("INSERT INTO users (email,password,isAdmin) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING", [
		"admin",
		await hashPassword("admin"),
		"true",
	]);
}

async function promoteToAdmin(req: express.Request) {
	let updatedUser = pool.query("UPDATE users SET isAdmin=$1 WHERE email=$2", [true, req.body.email]);
	return updatedUser;
}

async function hashPassword(password: string) {
	return bcrypt.hash(password, 10);
}

async function forgotPassword(req: any, res: express.Response, next: express.NextFunction) {
	console.log(req.body);
	const result = await getUserByEmail(req.body.email, res, next);
	if (!result.rows.length) {
		return next(new HttpException(404, "User not found"));
	}
	let user: User = result.rows[0];
	let resetToken = crypto.randomBytes(20).toString("hex");
	let forgotToken = resetToken;
	let datecopy = new Date(Date.now());
	datecopy.setDate(datecopy.getDate() + 1);
	let forgotExpires = datecopy;
	insertForgotToken(user.email, forgotToken, forgotExpires);
	const link = process.env.BASEURL + "/user/passwordReset/" + resetToken;
	sendForgotEmail(link, user.email);
	return true;
}

async function confirmEmail(req: any, res: express.Response, next: express.NextFunction) {
	console.log(req.body.email);
	const result = await getUserByEmail(req.body.email, res, next);
	if (!result.rows.length) {
		return next(new HttpException(404, "User not found or Account already activated"));
	}
	let user: User = result.rows[0];
	let confirmToken = crypto.randomBytes(20).toString("hex");
	insertConfirmToken(user.email, confirmToken);
	const link = process.env.BASEURL + "/user/confirmation/" + confirmToken;
	sendConfirmEmail(link, user.email);
	return true;
}

async function changePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
	console.log(req.params.hash);
	let result = await getUserByForgotToken(req.params.hash);
	console.log(result);
	if (!result.rows.length) {
		return next(new HttpException(404, "User not found"));
	}
	let user: User = result.rows[0];
	console.log(user);
	if (user.forgotExpires > Date.now()) {
		return next(new HttpException(403, "Token is expired"));
	}
	console.log(req.body.password);
	let updateduser = await updateForgotUser(req, user.forgottoken, req.body.password);
	console.log(updateduser);
	return updateduser;
}

async function activateAccount(req: express.Request, res: express.Response, next: express.NextFunction) {
	let result = await getUserByConfirmToken(req.params.hash);
	if (!result.rows.length) {
		return next(new HttpException(404, "User not found"));
	}
	let user: User = result.rows[0];
	let activateduser = await activateUserAccount(user);
	console.log(activateduser);
	if ((activateduser.rowCount = 0)) {
		return next(new HttpException(500, "Activating user failed"));
	}
	return activateduser;
}

function sendForgotEmail(link: string, email: string) {
	const client = Sib.ApiClient.instance;
	const apiKey = client.authentications["api-key"];
	apiKey.apiKey = process.env.EMAIL_API_KEY;
	const tranEmailApi = new Sib.TransactionalEmailsApi();
	const sender = {
		email: process.env.EMAIL,
		name: "drawerio",
	};
	const receivers = [
		{
			email: email,
		},
	];
	tranEmailApi
		.sendTransacEmail({
			sender,
			to: receivers,
			subject: "You forgot your password",
			htmlContent:
			`<html>
				<head></head>
				<body>
					<p>
						Hello,<br>
						You are receiving this because you (or someone else) have requested the reset of the password for your account.<br>
						Please click on the following link, or paste this into your browser to complete the process:<br>
						<a href="${link}">${link}</a><br>
						If you did not request this, please ignore this email and your password will remain unchanged.
					</p>
				</body>
			</html>`
		})
		.then(console.log)
		.catch(console.log);
}

function sendConfirmEmail(link: string, email: string) {
	const client = Sib.ApiClient.instance;
	const apiKey = client.authentications["api-key"];
	apiKey.apiKey = process.env.EMAIL_API_KEY;
	const tranEmailApi = new Sib.TransactionalEmailsApi();
	const sender = {
		email: process.env.EMAIL,
		name: "drawerio",
	};
	const receivers = [
		{
			email: email,
		},
	];
	tranEmailApi
		.sendTransacEmail({
			sender,
			to: receivers,
			subject: "Please confirm your email",
			htmlContent:
			`<html>
				<head></head>
				<body>
					<p>
						Hello,<br>
						Please click the link provided to confirm your email:<br>
						<a href="${link}">${link}</a><br>
					</p>
				</body>
			</html>`
		})
		.then(console.log)
		.catch(console.log);
}

module.exports = {
	getUsers,
	getUser,
	getUserByEmail,
	updateUser,
	insertRefreshToken,
	deleteUser,
	registerUser,
	registerAdmin,
	promoteToAdmin,
	forgotPassword,
	confirmEmail,
	changePassword,
	activateAccount,
};
