const express = require('express');
const router = express.Router()
const Account = require('../models/login')


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
router.get('/:username', getAcc, (req, res) => {
    res.json(res.acc)
})
//Creating one
router.post('/', async (req, res) => {
    const acc = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        VIP: req.body.VIP,
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
router.delete('/:id', getAcc, async (req, res) => {
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