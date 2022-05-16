import express from 'express';
const router = express.Router()
const authenticationFunctions = require('./authenticationFunctions')

/**
 * @swagger
 * /auth/login:
 *    post:
 *      description: Returns specific user
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully logged in user
 *        '500':
 *          description: Failed to login user
 *      requestBody:
 *          content:
 *            application/x-www-form-urlencoded:
 *               schema:
 *                  type: object
 *                  properties:
 *                     email:
 *                        type: string
 *                     password:
 *                        type: string
 *                   
 */
 router.post('/login', async(req: express.Request, res: express.Response) => {
    try {
        const loginToken = await authenticationFunctions.login(req, res)
        if(!loginToken) {
            res.status(500).json({ message: "login not successful!" })
        } else {
            res.status(200).json(loginToken);
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

/**
 * @swagger
 * /auth/token:
 *    post:
 *      description: Returns specific user
 *      security:
 *          - bearerAuth: [] 
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully refreshed token
 *        '500':
 *          description: Failed to refresh token of user
 */
router.post('/token', authenticationFunctions.authenticateToken, async (req: express.Request, res: express.Response) =>{
    let newAccessToken = await authenticationFunctions.refreshTheToken(req, res)
    if(newAccessToken == null){
        return res.sendStatus(401)
    }
    res.json(newAccessToken)
})

module.exports = router