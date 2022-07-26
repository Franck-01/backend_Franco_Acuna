const express = require('express')
const session = require('express-session')
const dotenv = require('dotenv')
const passport = require('passport')
const mongoose = require('mongoose')
const { router } = require('./router/users.routes.js')
const { productRouter } = require('./router/products.routes.js')
const { logConsole, logWarn, logError, configuratePass } = require('./services/users.services.js')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8030
const server = app.listen(PORT, () => {
  logConsole.info(`Listening on port ${PORT}`)
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const URL = process.env.URL
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 30000
  }
}))

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) return ('Unable to Connect')
  logConsole.info('database = users Connected')
})
configuratePass()
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router)
app.use('/product', productRouter)
