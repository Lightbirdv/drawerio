import express from "express";

const router = express.Router();
const drawerFunctions = require("./drawerFunctions");
const authenticationFunctions = require("../authentication/authenticationFunctions");

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
router.get("/all", authenticationFunctions.isAdmin, async (res: express.Response) => {
	try {
		const drawers = await drawerFunctions.getDrawers();
		res.json(drawers);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
});

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
router.get("/all/user", authenticationFunctions.authenticateToken, async (req: express.Request, res: express.Response) => {
	try {
		const drawers = await drawerFunctions.getDrawersByUser(req);
		if (!drawers) {
			res.status(500).json({ message: "retrieval of drawers failed" });
		}
		res.status(200).json(drawers);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
});

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
router.get(
	"/:id",
	authenticationFunctions.authenticateToken,
	drawerFunctions.isAuthorOrAdmin,
	async (req: any, res: express.Response, next: express.NextFunction) => {
		try {
			if (req.drawer) {
				const drawer = req.drawer;
				res.json(drawer);
			} else {
				res.status(500).json({ message: "there was a problem in the middle ware function" });
			}
		} catch (err: any) {
			res.status(500).json({ message: err.message });
		}
	}
);

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
router.patch(
	"/:id",
	authenticationFunctions.authenticateToken,
	drawerFunctions.isAuthorOrAdmin,
	async (req: express.Request, res: express.Response) => {
		try {
			const updatedDrawer = await drawerFunctions.updateDrawer(req);
			if (!updatedDrawer) {
				res.status(500).json({ message: "update of drawer failed" });
			} else {
				res.status(201).json("successfully changed a drawer");
			}
		} catch (err: any) {
			res.status(500).json({ message: err.message });
		}
	}
);

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
router.delete(
	"/:id",
	authenticationFunctions.authenticateToken,
	drawerFunctions.isAuthorOrAdmin,
	async (req: express.Request, res: express.Response) => {
		try {
			const deletedDrawer = await drawerFunctions.deleteDrawer(req);
			console.log(deletedDrawer);
			res.status(201).json("successfully deleted a drawer");
		} catch (err: any) {
			res.status(500).json({ message: err.message });
		}
	}
);

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
router.post("/add", authenticationFunctions.authenticateToken, async (req: express.Request, res: express.Response) => {
	try {
		var newDrawer = await drawerFunctions.addDrawer(req);
		res.status(201).json("successfully created new drawer");
	} catch (err: any) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
