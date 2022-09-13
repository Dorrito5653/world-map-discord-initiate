const express = require('express');
const router = express.Router()
const accounts = require('../models/login')

//Get all
router.get('/', async (req, res) => {
    try {
        const account = accounts.find({})
        res.json(account)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
    res.send('Hello World')
})

//Get one
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})
//Creating one
router.post('/', (req, res) => {
    
})
//Updating One
router.patch('/:id', (req, res) => {
    
})
//Deleting one
router.delete('/:id', (req, res) => {
    
})

module.exports = router;