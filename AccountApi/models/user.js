const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email:  String,
  name: String,
  password: {
    type: String
  },
  permissions: [String]
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel