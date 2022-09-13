const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    VIP: mongoose.Schema.Types.Boolean,
})

module.exports = mongoose.model('accounts', loginSchema)