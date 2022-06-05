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
const pool = require('../../queries').pool;
const drawerFunctions = require('../drawer/drawerFunctions');
const bcrypt = require('bcrypt');
const HttpException_1 = __importDefault(require("../../exceptions/HttpException"));
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = pool.query('SELECT * FROM users ORDER BY users_id ASC');
        return users;
    });
}
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query('SELECT * FROM users WHERE users_id=$1', [req.params.id]);
        if (result.rowCount == 0) {
            return next(new HttpException_1.default(404, 'User not found'));
        }
        let user = {
            users_id: result.rows[0].users_id,
            email: result.rows[0].email,
            password: result.rows[0].password,
            isAdmin: result.rows[0].isadmin,
            refreshToken: result.rows[0].refreshtoken
        };
        return user;
    });
}
function getUserByEmail(email, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (user.rowCount == 0) {
            return next(new HttpException_1.default(401, 'Unauthorized'));
        }
        return user.rows[0];
    });
}
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser(req, res, next);
        if (!user) {
            return next();
        }
        const newUser = pool.query('UPDATE users SET email=$1, password=$2 WHERE users_id=$3', [
            (req.body.email != null && req.body.email.length ? req.body.email : user.email),
            (req.body.password != null && req.body.password.length ? yield hashPassword(req.body.password) : user.password),
            req.params.id
        ]);
        return newUser;
    });
}
function insertRefreshToken(user, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = pool.query('UPDATE users SET refreshToken=$1 WHERE users_id=$2', [refreshToken, user.users_id]);
        return updatedUser;
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = pool.query('DELETE FROM users WHERE users_id=$1', [req.params.id]);
        return user;
    });
}
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var user = req.body;
        user.password = yield hashPassword(user.password);
        var newUser = yield pool.query('INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *', [user.email, user.password]);
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
        yield pool.query('INSERT INTO users (email,password,isAdmin) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING', ["admin", yield hashPassword("admin"), "true"]);
    });
}
function promoteToAdmin(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let updatedUser = pool.query('UPDATE users SET isAdmin=$1 WHERE email=$2', [true, req.body.email]);
        return updatedUser;
    });
}
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.hash(password, 10);
    });
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
    promoteToAdmin
};
