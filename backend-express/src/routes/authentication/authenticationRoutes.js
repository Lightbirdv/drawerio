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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authenticationFunctions = require('./authenticationFunctions');
/**
 * @swagger
 * /auth/login:
 *    post:
 *      description: Returns specific user
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully logged in user
 *        '500':
 *          description: Failed to login user
 *      requestBody:
 *          content:
 *            application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     email:
 *                        type: string
 *                     password:
 *                        type: string
 *
 */
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accessToken, refreshToken } = yield authenticationFunctions.login(req, res);
        if (!accessToken) {
            res.status(500).json({ message: "login not successful!" });
        }
        else {
            res.status(200).json(accessToken);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /auth/token:
 *    post:
 *      description: Returns refreshed token
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully refreshed token
 *        '500':
 *          description: Failed to refresh token of user
 */
router.post('/token', authenticationFunctions.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newAccessToken = yield authenticationFunctions.refreshTheToken(req, res);
    if (newAccessToken == null) {
        return res.sendStatus(401);
    }
    res.json(newAccessToken);
}));
/**
 * @swagger
 * /auth/tokenRefresh:
 *    post:
 *      description: Returns refreshed token
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully refreshed token
 *        '500':
 *          description: Failed to refresh token of user
 */
router.post('/tokenRefresh', authenticationFunctions.authenticateRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newAccessToken = yield authenticationFunctions.refreshTheToken(req, res);
    if (newAccessToken == null) {
        return res.sendStatus(401);
    }
    res.json(newAccessToken);
}));
module.exports = router;
