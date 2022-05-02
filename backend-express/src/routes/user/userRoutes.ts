import express from 'express'

const router = express.Router()
const userFunctions = require('./userFunctions')

router.get('/all', async(req, res) => {
    try {
        const users = await userFunctions.getUsers()
        res.json(users.rows);
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/register', async(req, res) => {
    try {
        var newUser = await userFunctions.registerUser(req)
        res.status(201).json(newUser)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router