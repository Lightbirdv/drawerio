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
const userFunctions = require('../user/userFunctions');
const jwt = require('jsonwebtoken');
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body) {
            console.log("Error not json body found");
            res("JSON-Body missing", null, null);
            return;
        }
        let user = yield userFunctions.getUserByEmail(req.body.email, res);
        if (!user) {
            return null;
        }
        if (yield bcrypt.compare(req.body.password, user.password)) {
            const issuedAt = new Date().getTime();
            const expirationTime = +process.env.TIMEOUT;
            const expiresAt = issuedAt + (expirationTime * 1000);
            let accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256' });
            // let accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresAt, algorithm: 'HS256'})
            // let refreshToken = jwt.sign({ 'user': user.email }, process.env.REFRESH_TOKEN_SECRET)
            return accessToken;
        }
        else {
            return null;
        }
    });
}
function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, uncodedToken) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return res.sendStatus(403);
            let user = yield userFunctions.getUserByEmail(uncodedToken.user, res);
            req.user = user;
            next();
        }));
    });
}
module.exports = {
    login,
    authenticateToken,
};
