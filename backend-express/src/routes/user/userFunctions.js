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
const getUsers = (req, res) => {
    const users = pool.query('SELECT * FROM users ORDER BY users_id ASC');
    console.log(users);
    return users;
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var user = req.body;
    user.password = yield hashPassword(user.password);
    console.log(user.password);
    const newUser = pool.query('INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *', [user.email, user.password]);
    return newUser;
});
const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};
module.exports = {
    getUsers,
    registerUser,
};
