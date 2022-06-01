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
const HttpException_1 = __importDefault(require("../../exceptions/HttpException"));
const pool = require('../../queries').pool;
const bcrypt = require('bcrypt');
const userFunctions = require('../user/userFunctions');
const jwt = require('jsonwebtoken');
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body) {
            return null;
        }
        let user = yield userFunctions.getUserByEmail(req.body.email, res, next);
        if (!user) {
            return next();
        }
        if (yield bcrypt.compare(req.body.password, user.password)) {
            let accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h', algorithm: 'HS256' });
            let refreshToken = jwt.sign({ 'user': user.email }, process.env.REFRESH_TOKEN_SECRET);
            let updatedUser = yield userFunctions.insertRefreshToken(user, refreshToken);
            if (!updatedUser) {
                return null;
            }
            return { accessToken, refreshToken };
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
            let user = yield userFunctions.getUserByEmail(uncodedToken.user, res, next);
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        }));
    });
}
function authenticateRefreshToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, uncodedToken) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return res.sendStatus(403);
            let user = yield userFunctions.getUserByEmail(uncodedToken.user, res, next);
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        }));
    });
}
function refreshTheToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = req.user;
        let accessToken = jwt.verify(user.refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, uncodedToken) => {
            if (err)
                return null;
            const accessToken = jwt.sign({ 'user': uncodedToken.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h', algorithm: 'HS256' });
            return accessToken;
        });
        return accessToken;
    });
}
function deleteRefreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return res.sendStatus(403);
            let updatedUser = yield userFunctions.insertRefreshToken(user, '');
            if (!updatedUser) {
                return null;
            }
        }));
        return true;
    });
}
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenuser) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return res.sendStatus(403);
            let user = yield userFunctions.getUserByEmail(tokenuser.user, res, next);
            if (!user) {
                return next;
            }
            if (user.isadmin == true) {
                req.user = user;
                next();
            }
            else {
                next(new HttpException_1.default(403, 'This function is only available for admins'));
            }
        }));
    });
}
module.exports = {
    login,
    authenticateToken,
    authenticateRefreshToken,
    refreshTheToken,
    deleteRefreshToken,
    isAdmin,
};
