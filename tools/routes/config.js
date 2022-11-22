const express = require('express');
const router = express.Router()
const Account = require('../models/login')
const bcrypt = require('bcryptjs')
const genToken = require("../functions/genToken")

//Get all
router.get('/', async (req, res) => {
    try {
    if (req.headers['token']) {
        const accBytoken = await Account.find({ token: req.headers['token'] });
        res.json(accBytoken)
    }
        const accounts = await Account.find()
        res.json(accounts)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

//Get one
router.get('/:username', getAcc, async (req, res) => {
    let user = await Account.find(req.body.username)
    if (!req.headers['password']) return;
    console.log(req.headers['password'])
    const check = await bcrypt.compare(req.headers['password'], user[0].password);
    console.log(check)
    if (check == false) {
        res.status(403).json("Incorrect Password")
        return;
    }
    res.status(201).json(res.acc)
})

//Get one by token
router.get('/:token', getAcc, async (req, res) => {
    res.json(res.acc)
})

//Creating one
router.post('/', async (req, res) => {
    const user = await Account.find({ username: req.body.username })
    if (user.length != 0) {
        res.status(409).json("That username already exists. Pick a different one.")
        return;
    }
    const acc = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        VIP: false,
        token: genToken(),
        created_date: req.body.created_date,
        updated_date: req.body.updated_date,
        xp: 0,
        level: 0
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
        Account.remove({username: req.params.username}, {justOne: true} )
        res.json({ message: 'Deleted Account'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getAcc(req, res, next){
    let acc;
    try {
        acc = await Account.find({username: req.params.username})
        if (acc.length == 0) {
            return res.status(404).json({ message: 'Cannot find account'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.acc = acc;
    next()
}

module.exports = router;