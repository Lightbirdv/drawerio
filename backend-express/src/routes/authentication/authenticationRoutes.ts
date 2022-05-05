import express from 'express'

const router = express.Router()
const authenticationFunctions = require('./authenticationFunctions')

/**
 * @swagger
 * /auth/login:
 *    get:
 *      description: Returns specific user
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully logged in user
 *        '500':
 *          description: Failed to login user
 *      parameters:
 *          - in: formData
 *            name: email
 *            type: string
 *            description: email to be changed to
 *            required: true
 *          - in: formData
 *            name: password
 *            type: string
 *            description: password to be changed to
 *            required: true
 */
 router.get('/login', async(req, res) => {
    try {
        const loginToken = await authenticationFunctions.login(req, res)
        res.status(200).json(loginToken);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router