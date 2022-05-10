import express from 'express'
const pool = require('../../queries').pool;
const bcrypt = require('bcrypt');
const userFunctions = require('../user/userFunctions')
const jwt = require('jsonwebtoken')

interface User {
  email: string;
  password: string;
}

interface UncodedToken {
    user: string;
    iat: number;
}

async function login(req: any, res: any) {
    if(!req.body) {
        console.log("Error not json body found")
        res("JSON-Body missing", null, null)
        return
    }
    let user = await userFunctions.getUserByEmail(req.body.email, res)
    if(!user) {
        return null
    }
    if(await bcrypt.compare(req.body.password, user.password)) {
        const issuedAt = new Date().getTime()
        const expirationTime: number = +process.env.TIMEOUT!
        const expiresAt = issuedAt + (expirationTime * 1000)
        let accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, {algorithm: 'HS256'})
        // let accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresAt, algorithm: 'HS256'})
        // let refreshToken = jwt.sign({ 'user': user.email }, process.env.REFRESH_TOKEN_SECRET)
        return accessToken
    } else {
        return null
    }
}

async function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: any, uncodedToken: UncodedToken) => {
        if (err) return res.sendStatus(403)
        let user = await userFunctions.getUserByEmail(uncodedToken.user, res)
        req.user = user
        next()
    })
}

module.exports = {
    login,
    authenticateToken,
};