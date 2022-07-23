const mongoose = require('mongoose')
const { logConsole, logError } = require('../services/users.services.js')
const dotenv = require('dotenv')

dotenv.config()

const URL = process.env.URL

const mongoConfig = mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) return ('Unable to Connect')
  logConsole.info('Connect to DB')
})

module.exports = mongoConfig
