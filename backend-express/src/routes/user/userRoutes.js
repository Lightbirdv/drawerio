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
const userFunctions = require('./userFunctions');
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
 *      tags:
 *          - user endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned all user
 *        '500':
 *          description: Failed to query for users
 */
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userFunctions.getUser(req);
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
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateduser = yield userFunctions.updateUser(req);
        res.json(updateduser);
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
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteduser = yield userFunctions.deleteUser(req);
        res.json(deleteduser);
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
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var newUser = yield userFunctions.registerUser(req);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
module.exports = router;
