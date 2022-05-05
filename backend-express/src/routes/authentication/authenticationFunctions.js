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
const uF = require('../user/userFunctions');
const jwt = require('jsonwebtoken');
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body) {
            console.log("Error not json body found");
            res("JSON-Body missing", null, null);
            return;
        }
        let user = yield uF.getUserByEmail(req.body.email, res);
        console.log(user);
        if (yield bcrypt.compare(req.body.password, user.password)) {
            const issuedAt = new Date().getTime();
            const expirationTime = +process.env.TIMEOUT;
            const expiresAt = issuedAt + (expirationTime * 1000);
            let accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresAt, algorithm: 'HS256' });
            return 'Bearer ' + accessToken;
        }
        else {
            return null;
        }
    });
}
module.exports = {
    login,
};
