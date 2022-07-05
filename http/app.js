const express = require("express")
const session = require("express-session")
const dotenv = require("dotenv")
const passport = require("passport")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
const { logConsole, logError } = require("./src/services/users.services.js")
const { router } = require("./src/router/users.routes.js")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    logConsole.info(`Listening on port ${PORT}`)
})
app.set("views", __dirname + "/src/views")
app.set("view engine", "ejs")

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
    if (err) return ("Unable to Connect")
    logConsole.info("Connect to DB")
})

app.use(passport.initialize())
app.use(passport.session())

app.use("/", router)