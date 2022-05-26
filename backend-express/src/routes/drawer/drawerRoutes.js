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
const drawerFunctions = require('./drawerFunctions');
const authenticationFunctions = require('../authentication/authenticationFunctions');
/**
 * @swagger
 * /drawer/all:
 *    get:
 *      description: Returns all drawer
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - drawer endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned all drawer
 *        '500':
 *          description: Failed to query for drawers
 */
router.get('/all', authenticationFunctions.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drawers = yield drawerFunctions.getDrawers();
        res.json(drawers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawer/all/user:
 *    get:
 *      description: Returns all drawer for specific user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - drawer endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned drawers
 *        '500':
 *          description: Failed to query for drawers
 */
router.get('/all/user', authenticationFunctions.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drawers = yield drawerFunctions.getDrawersByUser(req);
        if (!drawers) {
            res.status(500).json({ message: "retrieval of drawers failed" });
        }
        res.status(200).json(drawers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawer/{id}:
 *    get:
 *      description: Returns specific drawer
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - drawer endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned drawer
 *        '500':
 *          description: Failed to query for drawer
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            description: id of the drawer
 *            required: true
 */
router.get('/:id', authenticationFunctions.authenticateToken, drawerFunctions.isAuthorOrAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.drawer) {
            const drawer = req.drawer;
            res.json(drawer);
        }
        else {
            const drawer = yield drawerFunctions.getSingleDrawer(req, res, next);
            res.json(drawer);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawer/{id}:
 *    patch:
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      description: Updates specific drawer
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - drawer endpoints
 *      responses:
 *        '200':
 *          description: Successfully update drawer
 *        '500':
 *          description: Failed to query for drawer
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            description: id of the drawer
 *            required: true
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     drawerTitle:
 *                        type: string
 *                        required: false
 */
router.patch('/:id', authenticationFunctions.authenticateToken, drawerFunctions.isAuthorOrAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDrawer = yield drawerFunctions.updateDrawer(req);
        res.status(201).json("successfully changed a drawer");
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawer/{id}:
 *    delete:
 *      description: Delete specific drawer
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - drawer endpoints
 *      responses:
 *        '200':
 *          description: Successfully deleted drawer
 *        '500':
 *          description: Failed to query for drawer
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            description: id of the drawer
 *            required: true
 */
router.delete('/:id', authenticationFunctions.authenticateToken, drawerFunctions.isAuthorOrAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDrawer = yield drawerFunctions.deleteDrawer(req);
        res.status(201).json("successfully deleted a drawer");
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawer/add:
 *    post:
 *      description: Returns specific user
 *      security:
 *          - bearerAuth: []
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      tags:
 *          - drawer endpoints
 *      responses:
 *        '200':
 *          description: Successfully created drawer
 *        '500':
 *          description: Failed to create drawer
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     drawerTitle:
 *                        type: string
 */
router.post('/add', authenticationFunctions.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var newDrawer = yield drawerFunctions.addDrawer(req);
        res.status(201).json("successfully created new drawer");
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
module.exports = router;
