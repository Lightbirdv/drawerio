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
const drawerentryFunctions = require('./drawerentryFunctions');
const authFunctions = require('../authentication/authenticationFunctions');
/**
 * @swagger
 * /drawerentry/all:
 *    get:
 *      description: Returns all drawerentries
 *      tags:
 *          - drawerentry endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned all drawerentries
 *        '500':
 *          description: Failed to query for drawerentries
 */
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drawerentries = yield drawerentryFunctions.getEntries();
        res.json(drawerentries.rows);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawerentry/all/{drawerid}:
 *    get:
 *      description: Returns all entries for specific drawer
 *      tags:
 *          - drawerentry endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned entries
 *        '500':
 *          description: Failed to query for entries
 *      parameters:
 *          - in: path
 *            name: drawerid
 *            schema:
 *              type: integer
 *            description: id of the drawer
 *            required: true
 */
router.get('/all/:drawerid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drawerentries = yield drawerentryFunctions.getEntriesByDrawer(req);
        if (!drawerentries) {
            res.status(500).json({ message: "retrieval of drawerentries failed" });
        }
        res.status(201).json(drawerentries);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawerentry/{id}:
 *    get:
 *      description: Returns specific entry
 *      tags:
 *          - drawerentry endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned entry
 *        '500':
 *          description: Failed to query for entry
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            description: id of the entry
 *            required: true
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entry = yield drawerentryFunctions.getSingleEntry(req);
        res.json(entry);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawerentry/{id}:
 *    patch:
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      description: Updates specific entry
 *      tags:
 *          - drawerentry endpoints
 *      responses:
 *        '200':
 *          description: Successfully update entry
 *        '500':
 *          description: Failed to query for entry
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            description: id of the entry
 *            required: true
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     comment:
 *                        type: string
 *                        required: false
 *                     imageURL:
 *                        type: string[]
 *                        required: false
 */
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEntry = yield drawerentryFunctions.updateEntry(req);
        res.json(updatedEntry);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawerentry/{id}:
 *    delete:
 *      description: Delete specific entry
 *      tags:
 *          - drawerentry endpoints
 *      responses:
 *        '200':
 *          description: Successfully deleted entry
 *        '500':
 *          description: Failed to query for entry
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            description: id of the entry
 *            required: true
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedEntry = yield drawerentryFunctions.deleteEntry(req);
        res.json(deletedEntry);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
/**
 * @swagger
 * /drawerentry/add:
 *    post:
 *      description: Returns specific entry
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      tags:
 *          - drawerentry endpoints
 *      responses:
 *        '200':
 *          description: Successfully created entry
 *        '500':
 *          description: Failed to create entry
 *      requestBody:
 *          content:
 *             application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     comment:
 *                        type: string
 *                     imageURL:
 *                        type: array
 *                        items:
 *                           type: string
 *                     drawer_id:
 *                        type: number
 */
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var newEntry = yield drawerentryFunctions.addEntry(req);
        res.status(201).json(newEntry);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
module.exports = router;
