"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require("../../queries").pool;
const drawerFunctions = require("../drawer/drawerFunctions");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Sib = require("sib-api-v3-sdk");
const HttpException_1 = __importDefault(require("../../exceptions/HttpException"));
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = pool.query("SELECT * FROM users ORDER BY users_id ASC");
        return users;
    });
}
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM users WHERE users_id=$1", [req.params.id]);
        if (result.rowCount == 0) {
            return next(new HttpException_1.default(404, "User not found"));
        }
        let user = {
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
    });
}
function getUserByEmail(email, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield pool.query("SELECT * FROM users WHERE email=$1", [email]);
        return user;
    });
}
function getUserByForgotToken(forgotToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM users WHERE forgotToken=$1", [forgotToken]);
        return result;
    });
}
function getUserByConfirmToken(confirmationToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM users WHERE confirmationToken=$1", [confirmationToken]);
        return result;
    });
}
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser(req, res, next);
        if (!user) {
            return next();
        }
        const newUser = pool.query("UPDATE users SET email=$1, password=$2 WHERE users_id=$3", [
            req.body.email != null && req.body.email.length ? req.body.email : user.email,
            req.body.password != null && req.body.password.length ? yield hashPassword(req.body.password) : user.password,
            req.params.id,
        ]);
        return newUser;
    });
}
function updateForgotUser(req, forgotToken, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("UPDATE users SET forgotToken=$1, forgotExpires=$2, password=$3 WHERE forgotToken=$4", [
            "",
            null,
            yield hashPassword(password),
            forgotToken,
        ]);
        return result;
    });
}
function activateUserAccount(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("UPDATE users SET enabled=$1, confirmationToken=$2 WHERE email=$3", [true, "", user.email]);
        return result;
    });
}
function insertRefreshToken(user, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = pool.query("UPDATE users SET refreshToken=$1 WHERE users_id=$2", [refreshToken, user.users_id]);
        return updatedUser;
    });
}
function insertForgotToken(email, forgotToken, forgotExpires) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = pool.query("UPDATE users SET forgotToken=$1, forgotExpires=$2 WHERE email=$3", [forgotToken, forgotExpires, email]);
        return updatedUser;
    });
}
function insertConfirmToken(email, confirmToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = pool.query("UPDATE users SET confirmationToken=$1 WHERE email=$2", [confirmToken, email]);
        return updatedUser;
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = pool.query("DELETE FROM users WHERE users_id=$1", [req.params.id]);
        return user;
    });
}
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var user = req.body;
        user.password = yield hashPassword(user.password);
        var newUser = yield pool.query("INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *", [user.email, user.password]);
        if (!newUser) {
            return null;
        }
        newUser = newUser.rows[0];
        const defaultDrawer = yield drawerFunctions.addDefaultDrawer(newUser.users_id);
        if (!defaultDrawer) {
            return null;
        }
        return newUser;
    });
}
function registerAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pool.query("INSERT INTO users (email,password,isAdmin) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING", [
            "admin",
            yield hashPassword("admin"),
            "true",
        ]);
    });
}
function promoteToAdmin(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let updatedUser = pool.query("UPDATE users SET isAdmin=$1 WHERE email=$2", [true, req.body.email]);
        return updatedUser;
    });
}
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.hash(password, 10);
    });
}
function forgotPassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const result = yield getUserByEmail(req.body.email, res, next);
        if (!result.rows.length) {
            return next(new HttpException_1.default(404, "User not found"));
        }
        let user = result.rows[0];
        let resetToken = crypto.randomBytes(20).toString("hex");
        let forgotToken = resetToken;
        let datecopy = new Date(Date.now());
        datecopy.setDate(datecopy.getDate() + 1);
        let forgotExpires = datecopy;
        insertForgotToken(user.email, forgotToken, forgotExpires);
        const link = process.env.BASEURL + "/user/passwordReset/" + resetToken;
        sendForgotEmail(link, user.email);
        return true;
    });
}
function confirmEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body.email);
        const result = yield getUserByEmail(req.body.email, res, next);
        if (!result.rows.length) {
            return next(new HttpException_1.default(404, "User not found or Account already activated"));
        }
        let user = result.rows[0];
        let confirmToken = crypto.randomBytes(20).toString("hex");
        insertConfirmToken(user.email, confirmToken);
        const link = process.env.BASEURL + "/user/confirmation/" + confirmToken;
        sendConfirmEmail(link, user.email);
        return true;
    });
}
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.params.hash);
        let result = yield getUserByForgotToken(req.params.hash);
        console.log(result);
        if (!result.rows.length) {
            return next(new HttpException_1.default(404, "User not found"));
        }
        let user = result.rows[0];
        console.log(user);
        if (user.forgotExpires > Date.now()) {
            return next(new HttpException_1.default(403, "Token is expired"));
        }
        console.log(req.body.password);
        let updateduser = yield updateForgotUser(req, user.forgottoken, req.body.password);
        console.log(updateduser);
        return updateduser;
    });
}
function activateAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield getUserByConfirmToken(req.params.hash);
        if (!result.rows.length) {
            return next(new HttpException_1.default(404, "User not found"));
        }
        let user = result.rows[0];
        let activateduser = yield activateUserAccount(user);
        console.log(activateduser);
        if ((activateduser.rowCount = 0)) {
            return next(new HttpException_1.default(500, "Activating user failed"));
        }
        return activateduser;
    });
}
function sendForgotEmail(link, email) {
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
        htmlContent: `<html>
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
function sendConfirmEmail(link, email) {
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
        htmlContent: `<html>
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
