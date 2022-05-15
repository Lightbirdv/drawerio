import express from 'express'
const pool = require('../../queries').pool;
const drawerFunctions = require('../drawer/drawerFunctions')
const bcrypt = require('bcrypt');

interface User {
  users_id: number;
  email: string;
  password: string;
}

async function getUsers(req:any, res:any) {
    const users = pool.query('SELECT * FROM users ORDER BY users_id ASC');
    return users
}

async function getUser(req:any, res:any) {
  const user = pool.query('SELECT * FROM users WHERE users_id=$1',
    [req.params.id]
  );
  return user
}

async function getUserByEmail(email:string, res:any) {
  const user = await pool.query('SELECT * FROM users WHERE email=$1',
    [email]
  );
  return user.rows[0]
}

async function updateUser(req:any, res:any) {
  const user = await getUser(req, res)
  let oldUser = { email: user.rows[0].email, password: user.rows[0].password}
  const newUser = pool.query('UPDATE users SET email=$1, password=$2 WHERE users_id=$3',
    [
      (req.body.email != null && req.body.email.length ? req.body.email : oldUser.email), 
      (req.body.password != null && req.body.password.length ? await hashPassword(req.body.password) : oldUser.password), 
      req.params.id
    ]
  );
  return newUser
}

async function insertRefreshToken(user: User, refreshToken:string) {
  const updatedUser = pool.query('UPDATE users SET refreshToken=$1 WHERE users_id=$2',
    [refreshToken, user.users_id]
  );
  return updatedUser
}

async function deleteUser(req:any, res:any) {
  const user = pool.query('DELETE FROM users WHERE users_id=$1',
    [req.params.id]
  );
  return user
}

async function registerUser(req: any, res: any) {
  var user: User = req.body;
  user.password = await hashPassword(user.password);
  var newUser = await pool.query('INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *',
    [user.email,user.password]
  );
  if(!newUser) {
    return null
  }
  newUser = newUser.rows[0]
  const defaultDrawer = await drawerFunctions.addDefaultDrawer(newUser.users_id)
  if(!defaultDrawer) {
    return null
  }
  return newUser
}

async function registerAdmin() {
  await pool.query('INSERT INTO users (email,password,isAdmin) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING',
    ["admin", await hashPassword("admin"), "true"]
  );
}

async function promoteToAdmin(req: any) {
  let updatedUser = pool.query('UPDATE users SET isAdmin=$1 WHERE email=$2',
    [true, req.body.email]
  );
  return updatedUser
}

async function hashPassword(password: string) {
  return bcrypt.hash(password,10)
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
  promoteToAdmin
};