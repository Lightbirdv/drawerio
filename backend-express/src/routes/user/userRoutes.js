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
const userFunctions = require("./userFunctions");
const authenticationFunctions = require("../authentication/authenticationFunctions");
/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: email of the user
 *              password:
 *                  type: string
 *                  description: password of the user
 */
/**
 * @swagger
 * /user/all:
 *    get:
 *      description: Returns all users
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned all user
 *        '500':
 *          description: Failed to query for users
 */
router.get("/all", authenticationFunctions.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userFunctions.getUsers();
        res.json(users.rows);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /user/{id}:
 *    get:
 *      description: Returns specific user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned user
 *        '500':
 *          description: Failed to query for user
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            description: id of the user
 *            required: true
 */
router.get("/:id", authenticationFunctions.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userFunctions.getUser(req, res, next);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /user/{id}:
 *    patch:
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      description: Updates specific user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully update user
 *        '500':
 *          description: Failed to query for user
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            description: id of the user
 *            required: true
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     email:
 *                        type: string
 *                        required: false
 *                     password:
 *                        type: string
 *                        required: false
 */
router.patch("/:id", authenticationFunctions.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateduser = yield userFunctions.updateUser(req, res, next);
        res.status(201).json("successfully changed a user");
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /user/{id}:
 *    delete:
 *      description: Delete specific user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully deleted user
 *        '500':
 *          description: Failed to query for user
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            description: id of the user
 *            required: true
 */
router.delete("/:id", authenticationFunctions.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteduser = yield userFunctions.deleteUser(req);
        res.status(201).json("successfully deleted a user");
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /user/register:
 *    post:
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      description: Updates specific user
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully update user
 *        '500':
 *          description: Failed to query for user
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     email:
 *                        type: string
 *                     password:
 *                        type: string
 */
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var newUser = yield userFunctions.registerUser(req);
        if (!newUser) {
            res.status(500).json({ message: "register not successful" });
        }
        res.status(201).json("successfully registered a new user");
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /user/promotetoadmin:
 *    post:
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      description: Updates specific user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully update user
 *        '500':
 *          description: Failed to query for user
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     email:
 *                        type: string
 */
router.post("/promotetoadmin", authenticationFunctions.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var updatedUser = yield userFunctions.promoteToAdmin(req);
        if (!updatedUser) {
            res.status(500).json({ message: "promotion not successful" });
        }
        res.status(201).json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /user/forgot:
 *    post:
 *      description: sends forgot email to user
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully send email to user
 *        '500':
 *          description: Failed to send email to user
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     email:
 *                        type: string
 */
router.post("/forgot", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sendmail = yield userFunctions.forgotPassword(req, res, next);
        if (sendmail) {
            res.json({ message: "Email successfully send" });
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /user/confirm:
 *    post:
 *      description: sends confirmation email to user
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully send email to user
 *        '500':
 *          description: Failed to send email to user
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     email:
 *                        type: string
 */
router.post("/confirm", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sendmail = yield userFunctions.confirmEmail(req, res, next);
        if (sendmail) {
            res.json({ message: "Email successfully send" });
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /user/passwordReset/{hash}:
 *    post:
 *      description: sends forgot email to user
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully send email to user
 *        '500':
 *          description: Failed to send email to user
 *      parameters:
 *          - in: path
 *            name: hash
 *            schema:
 *              type: string
 *            description: hash of user that forgot password
 *            required: true
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     password:
 *                        type: string
 */
router.post("/passwordReset/:hash", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let changeduser = yield userFunctions.changePassword(req, res, next);
        if (changeduser) {
            res.status(200).json({ message: "Password successfully changed" });
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /user/confirmation/{hash}:
 *    post:
 *      description: activates user account after email confirmation
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully activated user
 *        '500':
 *          description: Failed to activate user
 *      parameters:
 *          - in: path
 *            name: hash
 *            schema:
 *              type: string
 *            description: hash of user for activation
 *            required: true
 */
router.post("/confirmation/:hash", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sendmail = yield userFunctions.activateAccount(req, res, next);
        if (sendmail) {
            res.json({ message: "Successfully activated account" });
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
module.exports = router;
