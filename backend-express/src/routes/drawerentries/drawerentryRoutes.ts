import express from 'express'

const router = express.Router()
const drawerentryFunctions = require('./drawerentryFunctions')
const authenticationFunctions = require('../authentication/authenticationFunctions')

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
 router.get('/all', authenticationFunctions.isAdmin, async(req, res) => {
    try {
        const drawerentries = await drawerentryFunctions.getEntries()
        res.json(drawerentries.rows);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
 router.get('/all/:drawerid', async(req, res) => {
    try {
        const drawerentries = await drawerentryFunctions.getEntriesByDrawer(req)
        if(!drawerentries) {
            res.status(500).json({ message: "retrieval of drawerentries failed" })
        }
        res.status(201).json(drawerentries);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
router.get('/:id', async(req, res) => {
    try {
        const entry = await drawerentryFunctions.getSingleEntry(req)
        res.json(entry);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
router.patch('/:id', authenticationFunctions.isAdmin, async (req, res) => {
    try {
        const updatedEntry = await drawerentryFunctions.updateEntry(req)
        res.json(updatedEntry);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
router.delete('/:id', authenticationFunctions.isAdmin, async (req, res) => {
    try {
        const deletedEntry = await drawerentryFunctions.deleteEntry(req)
        res.json(deletedEntry);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})


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
router.post('/add', async(req, res) => {
    try {
        var newEntry = await drawerentryFunctions.addEntry(req)
        res.status(201).json(newEntry)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router