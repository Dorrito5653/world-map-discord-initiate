const express = require('express');
const router = express.Router()
const Account = require('../models/login')
const bcrypt = require('bcryptjs')

//Get all
router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find()
        res.json(accounts)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

//Get one
router.get('/:username', getAcc, async (req, res) => {
    const user = await Account.find(req.body.username)
    console.log(req.headers['password'])
    const check = await bcrypt.compare(req.headers['password'], user[0].password);
    console.log(check)
    if (check == false) {
        res.status(403).json("Incorrect Password")
        return;
    }
    res.json(res.acc)
})

//Get one by sessionId
router.get('/:sessionId', getAcc, async (req, res) => {
    res.json(res.acc)
})

//Creating one
router.post('/', async (req, res) => {
    const acc = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        VIP: req.body.VIP,
        sessionId: req.body.sessionId,
        created_date: req.body.created_date,
        updated_date: req.body.updated_date
    })
    try {
        const newacc = await acc.save()
        res.status(201).json(newacc)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//Updating One
router.patch('/:id', (req, res) => {
    
})
//Deleting one
router.delete('/:username', getAcc, async (req, res) => {
    try {
        console.log(res.acc)
        await res.acc.remove()
        res.json({ message: 'Deleted subscriber'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getAcc(req, res, next){
    let acc;
    try {
        acc = await Account.find({username: req.params.username})
        if (acc == null) {
            return res.status(404).json({ message: 'Cannot find account'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.acc = acc;
    next()
}

module.exports = router;