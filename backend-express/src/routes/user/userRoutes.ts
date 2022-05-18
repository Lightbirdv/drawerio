import express from 'express'

const router = express.Router()
const userFunctions = require('./userFunctions')
const authenticationFunctions = require('../authentication/authenticationFunctions')

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
router.get('/all', authenticationFunctions.isAdmin, async(req: express.Request, res: express.Response) => {
    try {
        const users = await userFunctions.getUsers()
        res.json(users.rows);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
router.get('/:id', async(req: express.Request, res: express.Response) => {
    try {
        const user = await userFunctions.getUser(req)
        res.json(user);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
router.patch('/:id', authenticationFunctions.isAdmin, async (req: express.Request, res: express.Response) => {
    try {
        const updateduser = await userFunctions.updateUser(req)
        res.json(updateduser);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
router.delete('/:id', authenticationFunctions.isAdmin, async (req: express.Request, res: express.Response) => {
    try {
        const deleteduser = await userFunctions.deleteUser(req)
        res.json(deleteduser);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

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
router.post('/register', async(req: express.Request, res: express.Response) => {
    try {
        var newUser = await userFunctions.registerUser(req)
        if(!newUser) {
            res.status(500).json({ message: "register not successful" })
        }
        res.status(201).json(newUser)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

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
 router.post('/promotetoadmin', authenticationFunctions.isAdmin, async(req: express.Request, res: express.Response) => {
    try {
        var updatedUser = await userFunctions.promoteToAdmin(req)
        if(!updatedUser) {
            res.status(500).json({ message: "promotion not successful" })
        }
        res.status(201).json(updatedUser)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router