const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/User.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

const app = express();

app.listen(8080, () => {
    console.log("listening on port 8080")
})

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URL = "mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/class_26_1?retryWrites=true&w=majority"

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error("No se pudo conectar");
    console.log("db conectada")
})

app.use(session({
    secret: "clave",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        return done(err, user)
    })
})

const createHash = (password) => {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
    )
}

passport.use('registro', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return done(err)
            if (user) return done(null, false, { message: "user already exists" });
            const newUser = {
                name: req.body.name,
                username: username,
                password: createHash(password)
            }
            User.create(newUser, (err, userCreated) => {
                if (err) return done(err);
                return done(null, userCreated)
            })
        })
    }
))

passport.use('twitter', new TwitterStrategy({
        consumerKey: "QvA5i1XwhaKjCK3wQFYHJfFYa",
        consumerSecret: "3tqTReh7zZETMyB3XWBL05D59QC8YUFeTis9yQGMQx7is85Auq",
        callbackURL: "http://localhost:8080/auth/twitter/callback"
    },
    (token, tokenSecret, profile, done) => {
        User.findOne({ username: profile.username }, (err, userFound) => {
            if (err) return done(err)
            if (userFound) return done(null, userFound);
            const newUser = {
                name: profile.displayName,
                username: profile.username,
                password: profile.id
            }
            User.create(newUser, (err, userCreated) => {
                if (err) return done(err);
                return done(null, userCreated)
            })
        })
    }
))

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
    res.redirect("/perfil");
})

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/perfil',
    failureRedirect: '/login'
}))