import express from 'express'
const pool = require('../../queries').pool;
const bcrypt = require('bcrypt');
const userFunctions = require('../user/userFunctions')
const jwt = require('jsonwebtoken')

interface User {
  users_id: number;
  email: string;
  password: string;
  refreshToken: string;
  isadmin: boolean;
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
        let accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresAt, algorithm: 'HS256'})
        let refreshToken = jwt.sign({ 'user': user.email }, process.env.REFRESH_TOKEN_SECRET)
        let updatedUser = await userFunctions.insertRefreshToken(user, refreshToken)
        if(!updatedUser) {
            return null
        }
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
        console.log(uncodedToken)
        let user = await userFunctions.getUserByEmail(uncodedToken.user, res)
        req.user = user
        next()
    })
}

async function refreshTheToken(req:any, res:any) {
    let user = req.user
    let accessToken = jwt.verify(user.refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: User) => {
        if (err) return null
        const issuedAt = new Date().getTime()
        const expirationTime: number = +process.env.TIMEOUT!
        const expiresAt = issuedAt + (expirationTime * 1000)
        const accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresAt, algorithm: 'HS256'})
        return accessToken
    })
    
    return accessToken
}

async function deleteRefreshToken(req:any, res:any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: any,user: User) => {
        if (err) return res.sendStatus(403)
        let updatedUser = await userFunctions.insertRefreshToken(user, '')
        if(!updatedUser) {
            return null
        }
    })
    return true
}

async function isAdmin(req: any, res: any, next:any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: any,tokenuser: any) => {
        if (err) return res.sendStatus(403)
        let user: User = await userFunctions.getUserByEmail(tokenuser.user, res)
        if(user.isadmin == true){
            req.user = user
            next()
        } else {
            return res.status(500).send ({ message : 'This function is only available for admins' })
        }
    })
}

module.exports = {
    login,
    authenticateToken,
    refreshTheToken,
    deleteRefreshToken,
    isAdmin
};