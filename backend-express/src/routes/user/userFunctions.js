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
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require('../../queries').pool;
const bcrypt = require('bcrypt');
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = pool.query('SELECT * FROM users ORDER BY users_id ASC');
        console.log(users);
        return users;
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = pool.query('SELECT * FROM users WHERE users_id=$1', [req.params.id]);
        console.log(user);
        return user;
    });
}
function getUserByEmail(email, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield pool.query('SELECT * FROM users WHERE email=$1', [email]);
        return user.rows[0];
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser(req, res);
        console.log(user.rows);
        let oldUser = { email: user.rows[0].email, password: user.rows[0].password };
        const newUser = pool.query('UPDATE users SET email=$1, password=$2 WHERE users_id=$3', [(req.body.email != null ? req.body.email : oldUser.email), (req.body.password != null ? yield hashPassword(req.body.password) : oldUser.password), req.params.id]);
        console.log(newUser);
        return newUser;
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = pool.query('DELETE FROM users WHERE users_id=$1', [req.params.id]);
        console.log(user);
        return user;
    });
}
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var user = req.body;
        user.password = yield hashPassword(user.password);
        console.log(user.password);
        const newUser = pool.query('INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *', [user.email, user.password]);
        return newUser;
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
    deleteUser,
    registerUser,
};
