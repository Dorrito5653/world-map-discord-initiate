const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const loginSchema = new mongoose.Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    VIP: mongoose.Schema.Types.Boolean,
    created_date: mongoose.Schema.Types.Date,
    updated_date: mongoose.Schema.Types.Date,
})
//Hashing: We do this later
// loginSchema.pre('save', async function(next){
//     if (!this.isModified('password')){
//         next()
//     }
//     this.password = await bcrypt.hash(this.password, 10)
// })

module.exports = mongoose.model('accounts', loginSchema)