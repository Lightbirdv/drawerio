import express from 'express'

const router = express.Router()
const drawerFunctions = require('./drawerFunctions')
const authenticationFunctions = require('../authentication/authenticationFunctions')

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
 router.get('/all', authenticationFunctions.isAdmin, async(req, res) => {
    try {
        const drawers = await drawerFunctions.getDrawers()
        res.json(drawers.rows);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
 router.get('/all/user', authenticationFunctions.authenticateToken, async(req, res) => {
    try {
        const drawer = await drawerFunctions.getDrawersByUser(req)
        if(!drawer) {
            res.status(500).json({ message: "retrieval of drawers failed" })
        }
        res.status(201).json(drawer);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

/**
 * @swagger
 * /drawer/{id}:
 *    get:
 *      description: Returns specific drawer
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
router.get('/:id', async(req, res) => {
    try {
        const drawer = await drawerFunctions.getSingleDrawer(req)
        res.json(drawer);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
 *                     creationDate:
 *                        type: string
 *                        required: false
 *                     users_id:
 *                        type: number
 *                        required: false
 */
router.patch('/:id', authenticationFunctions.isAdmin, async (req, res) => {
    try {
        const updatedDrawer = await drawerFunctions.updateDrawer(req)
        res.json(updatedDrawer);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
router.delete('/:id', authenticationFunctions.isAdmin, async (req, res) => {
    try {
        const deletedDrawer = await drawerFunctions.deleteDrawer(req)
        res.json(deletedDrawer);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})


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
router.post('/add', authenticationFunctions.authenticateToken, async(req, res) => {
    try {
        var newDrawer = await drawerFunctions.addDrawer(req)
        res.status(201).json(newDrawer)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router