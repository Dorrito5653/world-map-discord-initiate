const mongoose = require("mongoose")
mongoose.connect(process.env.DBTOKEN || '',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
  });

const LoginSchema = new mongoose.Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    vip: mongoose.Schema.Types.Boolean,
});
const LoginSchemaModel = mongoose.model("accounts", LoginSchema);
module.exports = {
    LoginSchemaModel
}