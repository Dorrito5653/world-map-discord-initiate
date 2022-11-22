const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const loginSchema = new mongoose.Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    VIP: mongoose.Schema.Types.Boolean,
    token: mongoose.Schema.Types.String,
    created_date: mongoose.Schema.Types.Date,
    updated_date: mongoose.Schema.Types.Date,
    xp: mongoose.Schema.Types.Number,
    level: mongoose.Schema.Types.Number,
    resources: [{
        id: mongoose.Schema.Types.Number,
        amount: mongoose.Schema.Types.Number,
    }],
    commander: {
        id: mongoose.Schema.Types.Number,
        level: mongoose.Schema.Types.Number,
        xp: mongoose.Schema.Types.Number
    },
    buildings: [{
        id: mongoose.Schema.Types.Number,
        level: mongoose.Schema.Types.Number,
        xp: mongoose.Schema.Types.Number
    }],
    weapons: [{
        id: mongoose.Schema.Types.Number,
        level: mongoose.Schema.Types.Number,
        xp: mongoose.Schema.Types.Number
    }],
    recruits: [{
        id: mongoose.Schema.Types.Number,
        level: mongoose.Schema.Types.Number,
        xp: mongoose.Schema.Types.Number
    }],
})
//Hashing: We do this later
loginSchema.pre('save', async function(next){
    //Check if username already exists
    
    if (!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model('accounts', loginSchema)