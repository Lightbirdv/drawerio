import express from "express";
import { Drawerentry } from "./drawerentry";

const router = express.Router();
const drawerentryFunctions = require("./drawerentryFunctions");
const authenticationFunctions = require("../authentication/authenticationFunctions");

/**
 * @swagger
 * /drawerentry/all:
 *    get:
 *      description: Returns all drawerentries
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - drawerentry endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned all drawerentries
 *        '500':
 *          description: Failed to query for drawerentries
 */
router.get("/all", authenticationFunctions.isAdmin, async (req: express.Request, res: express.Response) => {
	try {
		const drawerentries = await drawerentryFunctions.getEntries();
		res.json(drawerentries);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * @swagger
 * /drawerentry/all/{drawerid}:
 *    get:
 *      description: Returns all entries for specific drawer
 *      security:
 *          - bearerAuth: []
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
router.get(
	"/all/:drawerid",
	authenticationFunctions.authenticateToken,
	drawerentryFunctions.isAuthorOrAdmin,
	async (req: express.Request, res: express.Response) => {
		try {
			const drawerentries = await drawerentryFunctions.getEntriesByDrawer(req);
			if (!drawerentries) {
				res.status(500).json({ message: "retrieval of drawerentries failed" });
			}
			res.status(201).json(drawerentries);
		} catch (err: any) {
			res.status(500).json({ message: err.message });
		}
	}
);

/**
 * @swagger
 * /drawerentry/from/user:
 *    get:
 *      description: Returns all drawerentries for specific user
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - drawerentry endpoints
 *      responses:
 *        '200':
 *          description: Successfully returned drawerentries
 *        '500':
 *          description: Failed to query for drawerentries
 */
 router.get("/from/user", authenticationFunctions.authenticateToken, async (req: express.Request, res: express.Response) => {
	try {
		const drawerentries = await drawerentryFunctions.getDrawerentriesByUser(req);
		if (!drawerentries) {
			res.status(500).json({ message: "retrieval of drawerentries failed" });
		}
		res.status(200).json(drawerentries);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * @swagger
 * /drawerentry/{id}:
 *    get:
 *      description: Returns specific entry
 *      security:
 *          - bearerAuth: []
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
router.get("/:id", authenticationFunctions.authenticateToken, drawerentryFunctions.isAuthorOrAdmin, async (req: any, res: express.Response) => {
	try {
		if (req.entry) {
			const entry = req.entry;
			res.json(entry);
		} else {
			const entry = await drawerentryFunctions.getSingleEntry(req);
			res.json(entry);
		}
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
});

/**
 * @swagger
 * /drawerentry/{id}:
 *    patch:
 *      consumes:
 *          - application/x-www-form-urlencoded
 *      description: Updates specific entry
 *      security:
 *          - bearerAuth: []
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
 *             application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     comment:
 *                        type: string
 *                     imageURL:
 *                        type: array
 *                        items:
 *                           type: string
 *                     videoURL:
 *                        type: array
 *                        items:
 *                           type: string
 *                     selText:
 *                        type: string
 *                        required: false
 */
router.patch(
	"/:id",
	authenticationFunctions.authenticateToken,
	drawerentryFunctions.isAuthorOrAdmin,
	async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			const updatedEntry = await drawerentryFunctions.updateEntry(req, res, next);
			if (updatedEntry) {
				res.status(201).json("successfully changed a drawer entry");
			}
		} catch (err: any) {
			res.status(500).json({ message: err.message });
		}
	}
);

/**
 * @swagger
 * /drawerentry/{id}:
 *    delete:
 *      description: Delete specific entry
 *      security:
 *          - bearerAuth: []
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
router.delete(
	"/:id",
	authenticationFunctions.authenticateToken,
	drawerentryFunctions.isAuthorOrAdmin,
	async (req: express.Request, res: express.Response) => {
		try {
			const deletedEntry = await drawerentryFunctions.deleteEntry(req);
			res.status(201).json("successfully deleted a drawer entry");
		} catch (err: any) {
			res.status(500).json({ message: err.message });
		}
	}
);

/**
 * @swagger
 * /drawerentry/add:
 *    post:
 *      description: Returns specific entry
 *      security:
 *          - bearerAuth: []
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
 *             application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     comment:
 *                        type: string
 *                     imageURL:
 *                        type: array
 *                        items:
 *                           type: string
 *                     videoURL:
 *                        type: array
 *                        items:
 *                           type: string
 *                     drawer_id:
 *                        type: number
 *                     originURL:
 *                        type: string
 *                     selText:
 *                        type: string
 */
router.post(
	"/add",
	authenticationFunctions.authenticateToken,
	drawerentryFunctions.isAuthorOrAdmin,
	async (req: express.Request, res: express.Response) => {
		try {
			var newEntry = await drawerentryFunctions.addEntry(req);
			res.status(201).json("successfully created a drawer entry");
		} catch (err: any) {
			res.status(400).json({ message: err.message });
		}
	}
);

module.exports = router;
