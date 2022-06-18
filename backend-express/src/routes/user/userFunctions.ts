import express from "express";
const pool = require("../../queries").pool;
const drawerFunctions = require("../drawer/drawerFunctions");
const bcrypt = require("bcrypt");
import HttpException from "../../exceptions/HttpException";

interface User {
  users_id: number;
  email: string;
  password: string;
  isAdmin: string;
  refreshToken: string;
}

async function getUsers(req: express.Request, res: express.Response) {
  const users = pool.query("SELECT * FROM users ORDER BY users_id ASC");
  return users;
}

async function getUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const result = await pool.query("SELECT * FROM users WHERE users_id=$1", [
    req.params.id,
  ]);
  if (result.rowCount == 0) {
    return next(new HttpException(404, "User not found"));
  }
  let user: User = {
    users_id: result.rows[0].users_id,
    email: result.rows[0].email,
    password: result.rows[0].password,
    isAdmin: result.rows[0].isadmin,
    refreshToken: result.rows[0].refreshtoken,
  };
  return user;
}

async function getUserByEmail(
  email: string,
  res: express.Response,
  next: express.NextFunction
) {
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  return user;
}

async function updateUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const user: User | void = await getUser(req, res, next);
  if (!user) {
    return next();
  }
  const newUser = pool.query(
    "UPDATE users SET email=$1, password=$2 WHERE users_id=$3",
    [
      req.body.email != null && req.body.email.length
        ? req.body.email
        : user.email,
      req.body.password != null && req.body.password.length
        ? await hashPassword(req.body.password)
        : user.password,
      req.params.id,
    ]
  );
  return newUser;
}

async function insertRefreshToken(user: User, refreshToken: string) {
  const updatedUser = pool.query(
    "UPDATE users SET refreshToken=$1 WHERE users_id=$2",
    [refreshToken, user.users_id]
  );
  return updatedUser;
}

async function deleteUser(req: express.Request, res: express.Response) {
  const user = pool.query("DELETE FROM users WHERE users_id=$1", [
    req.params.id,
  ]);
  return user;
}

async function registerUser(req: express.Request, res: express.Response) {
  var user: User = req.body;
  user.password = await hashPassword(user.password);
  var newUser = await pool.query(
    "INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *",
    [user.email, user.password]
  );
  if (!newUser) {
    return null;
  }
  newUser = newUser.rows[0];
  const defaultDrawer = await drawerFunctions.addDefaultDrawer(
    newUser.users_id
  );
  if (!defaultDrawer) {
    return null;
  }
  return newUser;
}

async function registerAdmin() {
  await pool.query(
    "INSERT INTO users (email,password,isAdmin) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING",
    ["admin", await hashPassword("admin"), "true"]
  );
}

async function promoteToAdmin(req: express.Request) {
  let updatedUser = pool.query("UPDATE users SET isAdmin=$1 WHERE email=$2", [
    true,
    req.body.email,
  ]);
  return updatedUser;
}

async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  insertRefreshToken,
  deleteUser,
  registerUser,
  registerAdmin,
  promoteToAdmin,
};
