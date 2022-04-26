const express = require("express")
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("./models/User.js");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.listen(8080, () => {
    console.log("listening on port 8080")
})

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: true }));

const URL = "mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/class25-2?retryWrites=true&w=majority"

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw new Error("unable to connect");
    console.log("connected to database successfully");
});

app.use(session({
    secret: "clave",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    return done(null, user);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        return done(err, user);
    })
})

const createHash = (password) => {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
    )
}

passport.use('signupStrategy', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return done(err);
            if (user) return done(null, false, { message: "user already exists" })

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

passport.use('loginStrategy', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, userFound) => {
            if (err) {
                console.log('error', err)
                return done(err);
            }
            if (!userFound) {
                console.log('user does not exists')
                return done(null, false, { message: "user does not exists" })
            }
            if (!bcrypt.compareSync(password, userFound.password)) {
                console.log("invalid password")
                return done(null, false, { message: "invalid password" })
            }
            console.log("userFound", userFound)
            return done(null, userFound)
        })
    }
))

const isUserLogged = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}

app.get('/', (req, res) => {
    res.sendFile(publicPath + '/index.html');
})

app.get('/signup', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('profile');
    res.sendFile(publicPath + '/signup.html');
})

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('profile');
    res.sendFile(publicPath + '/login.html');
})

app.get('/profile', isUserLogged, (req, res) => {
    res.sendFile(publicPath + '/profile.html');
})

app.post('/signup', passport.authenticate('signupStrategy', {
    failureRedirect: '/signup'
}), (req, res) => {
    res.redirect('/profile')
})

app.post('/login', passport.authenticate('loginStrategy', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/profile')
})

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})