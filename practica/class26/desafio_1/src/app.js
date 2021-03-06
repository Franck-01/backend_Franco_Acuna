const express = require("express")
const session = require("express-session")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const path = require("path")
const User = require("./models/User.js")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const app = express()
const PORT = process.env.PORT || 8000
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))

const publicPath = path.join(__dirname, "..", "public")
app.use(express.static(publicPath))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const URL = "mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/class_26_1?retryWrites=true&w=majority"
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error("No se logro la coneccion")
    console.log("conexion completa")
})

app.use(session({
    secret: "keyworld",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        return done(err, user)
    })
})

passport.use('registro', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) return done(err)
        if (user) return done(null, false, { message: "Este usuario ya existe" })
        const newUser = {
            name: req.body.name,
            username: username,
            password: password
        }
        User.create(newUser, (err, userCreated) => {
            if (err) return done(err);
            return done(null, userCreated)
        })
    })
}))

app.get('/', (req, res) => {
    res.sendFile(publicPath + '/index.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(publicPath + '/signup.html')
})

app.get('/login', (req, res) => {
    res.sendFile(publicPath + '/login.html')
})

app.get('/perfil', (req, res) => {
    res.sendFile(publicPath + '/perfil.html')
})

app.post("/signupForm", passport.authenticate('registro', {
    failureRedirect: '/signup',
}), (req, res) => {
    res.redirect("/perfil")
})