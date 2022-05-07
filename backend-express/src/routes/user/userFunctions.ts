import express from 'express'
const pool = require('../../queries').pool;
const bcrypt = require('bcrypt');

interface User {
  email: string;
  password: string;
}

async function getUsers(req:any, res:any) {
    const users = pool.query('SELECT * FROM users ORDER BY users_id ASC');
    console.log(users)
    return users
}

async function getUser(req:any, res:any) {
  const user = pool.query('SELECT * FROM users WHERE users_id=$1',
    [req.params.id]
  );
  console.log(user)
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
  console.log(user.rows)
  let oldUser = { email: user.rows[0].email, password: user.rows[0].password}
  const newUser = pool.query('UPDATE users SET email=$1, password=$2 WHERE users_id=$3',
    [
      (req.body.email != null && req.body.email.length ? req.body.email : oldUser.email), 
      (req.body.password != null && req.body.password.length ? await hashPassword(req.body.password) : oldUser.password), 
      req.params.id
    ]
  );
  console.log(newUser)
  return newUser
}

async function deleteUser(req:any, res:any) {
  const user = pool.query('DELETE FROM users WHERE users_id=$1',
    [req.params.id]
  );
  console.log(user)
  return user
}

async function registerUser(req: any, res: any) {
  var user: User = req.body;
  user.password = await hashPassword(user.password);
  console.log(user.password)
  const newUser = pool.query('INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *',
    [user.email,user.password]
  );
  return newUser
}

async function hashPassword(password: string) {
  return bcrypt.hash(password,10)
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  registerUser,
};