import express from "express";
import HttpException from "../../exceptions/HttpException";
const pool = require("../../queries").pool;
const bcrypt = require("bcrypt");
const userFunctions = require("../user/userFunctions");
const jwt = require("jsonwebtoken");

export interface User {
  users_id: number;
  email: string;
  password: string;
  refreshToken: string;
  isadmin: boolean;
}

interface UncodedToken {
  user: string;
  iat: number;
  exp: number;
}

// functions

async function login(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.body) {
    return null;
  }
  let result = await userFunctions.getUserByEmail(req.body.email, res, next);
  if (!result.rows.length) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  let user = result.rows[0];
  if (await bcrypt.compare(req.body.password, user.password)) {
    let accessToken = jwt.sign(
      { user: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h", algorithm: "HS256" }
    );
    let refreshToken = jwt.sign(
      { user: user.email },
      process.env.REFRESH_TOKEN_SECRET
    );
    let updatedUser = await userFunctions.insertRefreshToken(
      user,
      refreshToken
    );
    if (!updatedUser) {
      return res
        .status(401)
        .json({ message: "Login: Could not create login tokens" });
    }
    return { accessToken, refreshToken };
  } else {
    return res
      .status(401)
      .json({ message: "Login: Could not create login tokens" });
  }
}

async function refreshTheToken(req: any, res: express.Response) {
  let user = req.user;
  let accessToken = jwt.verify(
    user.refreshtoken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, uncodedToken: UncodedToken) => {
      if (err) return null;
      const accessToken = jwt.sign(
        { user: uncodedToken.user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "24h", algorithm: "HS256" }
      );
      return accessToken;
    }
  );

  return accessToken;
}

async function deleteRefreshToken(req: express.Request, res: express.Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err: any, user: User) => {
      if (err) return res.sendStatus(403);
      let updatedUser = await userFunctions.insertRefreshToken(user, "");
      if (!updatedUser) {
        return null;
      }
    }
  );
  return true;
}

async function logout(
  req: any,
  res: express.Response,
  next: express.NextFunction
) {
  let user = req.user;
  let updatedUser = await userFunctions.insertRefreshToken(user, "");
  if (!updatedUser) {
    return next();
  }
  return true;
}

// Middlewares

async function authenticateToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err: any, uncodedToken: UncodedToken) => {
      if (err) return res.sendStatus(403);
      let result = await userFunctions.getUserByEmail(
        uncodedToken.user,
        res,
        next
      );
      if (!result.rows.length) {
        return next(new HttpException(404, "No user found"));
      }
      let user = result.rows[0];
      req.user = user;
      next();
    }
  );
}

async function authenticateRefreshToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err: any, uncodedToken: UncodedToken) => {
      if (err) return res.sendStatus(403);
      let result = await userFunctions.getUserByEmail(
        uncodedToken.user,
        res,
        next
      );
      if (!result.rows.length) {
        return next(new HttpException(404, "No user found"));
      }
      let user = result.rows[0];
      req.user = user;
      next();
    }
  );
}

async function isAdmin(
  req: any,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err: any, uncodedToken: any) => {
      if (err) return res.sendStatus(403);
      let user: User = await userFunctions.getUserByEmail(
        uncodedToken.user,
        res,
        next
      );
      if (!user) {
        return next;
      }
      if (user.isadmin == true) {
        req.user = user;
        next();
      } else {
        next(
          new HttpException(403, "This function is only available for admins")
        );
      }
    }
  );
}

module.exports = {
  login,
  isAdmin,
  authenticateToken,
  authenticateRefreshToken,
  refreshTheToken,
  deleteRefreshToken,
  logout,
};
