import express from 'express'
const pool = require('../../queries').pool;
const bcrypt = require('bcrypt');

interface User {
  email: string;
  password: string;
}

const getUsers = (req:any, res:any) => {
    const users = pool.query('SELECT * FROM users ORDER BY users_id ASC');
    console.log(users)
    return users
}

const registerUser = async(req: any, res: any) => {
  var user: User = req.body;
  user.password = await hashPassword(user.password);
  console.log(user.password)
  const newUser = pool.query('INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *',
    [user.email,user.password]
  );
  return newUser
}

const hashPassword = (password: string) : string => {
  return bcrypt.hash(password,10)
}

module.exports = {
  getUsers,
  registerUser,
};