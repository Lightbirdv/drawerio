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
const authenticationFunctions = require("./authenticationFunctions");
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
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accessToken, refreshToken, user } = yield authenticationFunctions.login(req, res, next);
        console.log(user);
        delete user.password;
        res.status(200).json({
            token: accessToken,
            refreshToken: refreshToken,
            user: user,
        });
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
router.post("/token", authenticationFunctions.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.post("/tokenRefresh", authenticationFunctions.authenticateRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newAccessToken = yield authenticationFunctions.refreshTheToken(req, res);
    if (newAccessToken == null) {
        return res.sendStatus(401);
    }
    res.json(newAccessToken);
}));
/**
 * @swagger
 * /auth/isAdmin:
 *    get:
 *      description: Returns bool if user is admin
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully checked user
 *        '500':
 *          description: Failed to check for user
 */
router.get("/isAdmin", authenticationFunctions.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(500).json("Something went wrong!");
    }
    let json = { isadmin: req.user.isadmin };
    return res.status(200).json(json);
}));
/**
 * @swagger
 * /auth/isEnabled:
 *    get:
 *      description: Returns bool if user is enabled
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully checked user
 *        '500':
 *          description: Failed to check for user
 */
router.get("/isEnabled", authenticationFunctions.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(500).json("Something went wrong!");
    }
    let json = { enabled: req.user.enabled };
    return res.status(200).json(json);
}));
/**
 * @swagger
 * /auth/logout:
 *    post:
 *      description: Returns refreshed token
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully logged out user
 *        '500':
 *          description: Failed to logout user
 */
router.post("/logout", authenticationFunctions.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authenticationFunctions.logout(req, res, next);
        return res.status(200).json("successfully logged out user");
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
module.exports = router;
