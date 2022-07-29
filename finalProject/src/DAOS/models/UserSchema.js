const mongoose = require('mongoose')

const userCollection = 'users_final'
const userShema = new mongoose.Schema({
  name: { type: String },
  mail: { type: String },
  phone: { type: Number },
  age: { type: Number },
  cart: { type: Object },
  profile_picture: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})
const User = mongoose.model(userCollection, userShema)

module.exports = User
