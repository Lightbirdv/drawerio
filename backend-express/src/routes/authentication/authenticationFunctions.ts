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
    exp: number;
}

async function login(req: express.Request, res: express.Response) {
    if(!req.body) {
        console.log("Error not json body found")
        return null
    }
    let user = await userFunctions.getUserByEmail(req.body.email, res)
    if(!user) {
        return null
    }
    if(await bcrypt.compare(req.body.password, user.password)) {
        let accessToken = jwt.sign({ 'user': user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h', algorithm: 'HS256'})
        let refreshToken = jwt.sign({ 'user': user.email }, process.env.REFRESH_TOKEN_SECRET)
        let updatedUser = await userFunctions.insertRefreshToken(user, refreshToken)
        if(!updatedUser) {
            return null
        }
        return {accessToken, refreshToken}
    } else {
        return null
    }
}

async function authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
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

async function authenticateRefreshToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err: any, uncodedToken: UncodedToken) => {
        if (err) return res.sendStatus(403)
        console.log(uncodedToken)
        let user = await userFunctions.getUserByEmail(uncodedToken.user, res)
        req.user = user
        next()
    })
}

async function refreshTheToken(req:any, res:express.Response) {
    let user = req.user
    let accessToken = jwt.verify(user.refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err: any, uncodedToken: UncodedToken) => {
        if (err) return null
        const accessToken = jwt.sign({ 'user': uncodedToken.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h', algorithm: 'HS256'})
        return accessToken
    })
    
    return accessToken
}

async function deleteRefreshToken(req: express.Request, res: express.Response) {
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

async function isAdmin(req: any, res: express.Response, next:express.NextFunction) {
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
    authenticateRefreshToken,
    refreshTheToken,
    deleteRefreshToken,
    isAdmin
};