import express from 'express'
const pool = require('../../queries').pool;
const bcrypt = require('bcrypt');
const uF = require('../user/userFunctions')
const jwt = require('jsonwebtoken')

interface User {
  email: string;
  password: string;
}

async function login(req: any, res: any) {
    if(!req.body) {
        console.log("Error not json body found")
        res("JSON-Body missing", null, null);
        return
    }
    let user = await uF.getUserByEmail(req.body.email, res)
    console.log(user)
    if(await bcrypt.compare(req.body.password, user.password)) {
        const issuedAt = new Date().getTime()
        const expirationTime: number = +process.env.TIMEOUT!
        const expiresAt = issuedAt + (expirationTime * 1000)
        let accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresAt, algorithm: 'HS256'})
        return 'Bearer ' + accessToken
    } else {
        return null
    }
}

module.exports = {
    login,
};