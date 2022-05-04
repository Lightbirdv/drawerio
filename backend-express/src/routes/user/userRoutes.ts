import express from 'express'

const router = express.Router()
const userFunctions = require('./userFunctions')

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
router.get('/all', async(req, res) => {
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
router.get('/:id', async(req, res) => {
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
 *          - in: formData
 *            name: email
 *            type: string
 *            description: email to be changed to
 *            required: false
 *          - in: formData
 *            name: password
 *            type: string
 *            description: password to be changed to
 *            required: false
 */
router.patch('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
 *      parameters:
 *          - in: formData
 *            name: email
 *            type: string
 *            description: email to be changed to
 *            required: false
 *          - in: formData
 *            name: password
 *            type: string
 *            description: password to be changed to
 *            required: false
 */
router.post('/register', async(req, res) => {
    try {
        var newUser = await userFunctions.registerUser(req)
        res.status(201).json(newUser)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router