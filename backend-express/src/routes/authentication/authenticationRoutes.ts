import express from "express";
const router = express.Router();
const authenticationFunctions = require("./authenticationFunctions");
import { User } from "./authenticationFunctions";

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
router.post(
  "/login",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { accessToken, refreshToken } = await authenticationFunctions.login(
        req,
        res,
        next
      );
      res.status(200).json(accessToken);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

/**
 * @swagger
 * /auth/token:
 *    post:
 *      description: Returns refreshed token
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
router.post(
  "/token",
  authenticationFunctions.authenticateToken,
  async (req: express.Request, res: express.Response) => {
    let newAccessToken = await authenticationFunctions.refreshTheToken(
      req,
      res
    );
    if (newAccessToken == null) {
      return res.sendStatus(401);
    }
    res.json(newAccessToken);
  }
);

/**
 * @swagger
 * /auth/tokenRefresh:
 *    post:
 *      description: Returns refreshed token
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
router.post(
  "/tokenRefresh",
  authenticationFunctions.authenticateRefreshToken,
  async (req: express.Request, res: express.Response) => {
    let newAccessToken = await authenticationFunctions.refreshTheToken(
      req,
      res
    );
    if (newAccessToken == null) {
      return res.sendStatus(401);
    }
    res.json(newAccessToken);
  }
);

/**
 * @swagger
 * /auth/isAdmin:
 *    get:
 *      description: Returns bool if user is admin
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully checked user
 *        '500':
 *          description: Failed to check for user
 */
router.get(
  "/isAdmin",
  authenticationFunctions.authenticateToken,
  async (req: express.Request, res: express.Response) => {
    if (!req.user) {
      return res.status(500).json("Something went wrong!");
    }
    let json: JSON = <JSON>(<unknown>{ isadmin: req.user.isadmin });
    return res.status(200).json(json);
  }
);

/**
 * @swagger
 * /auth/isEnabled:
 *    get:
 *      description: Returns bool if user is enabled
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully checked user
 *        '500':
 *          description: Failed to check for user
 */
 router.get(
  "/isEnabled",
  authenticationFunctions.authenticateToken,
  async (req: any, res: express.Response) => {
    if (!req.user) {
      return res.status(500).json("Something went wrong!");
    }
    let json: JSON = <JSON>(<unknown>{ enabled: req.user.enabled });
    return res.status(200).json(json);
  }
);

/**
 * @swagger
 * /auth/logout:
 *    post:
 *      description: Returns refreshed token
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - authentication endpoints
 *      responses:
 *        '200':
 *          description: Successfully logged out user
 *        '500':
 *          description: Failed to logout user
 */
router.post(
  "/logout",
  authenticationFunctions.authenticateToken,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await authenticationFunctions.logout(req, res, next);
      return res.status(200).json("successfully logged out user");
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
