const express = require("express")
const session = require("express-session")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { fork } = require("child_process")
const {} = require("dotenv/config")
const { Server } = require("socket.io")
const productsManager = require("./Managers/productsManagers")
const files = require("./files/products.json")
const User = require("./models/User.js")

const servicesData = new productsManager()
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
const io = new Server(server)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const URL = "mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/process?retryWrites=true&w=majority"
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error("No se logro la conexion")
    console.log("conexion completa")
})

const mins = 60 * 10
app.use(session({
    store: MongoStore.create({
        mongoUrl: URL,
        ttl: mins,
    }),
    secret: "Command",
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
const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
passport.use('signup.ejs', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) return done(err)
        if (user) return done(null, false, { message: "Este usuario ya existe" })
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
}))
passport.use("login.ejs", new LocalStrategy({
    passReqToCallback: true,
}, (req, username, password, done) => {
    User.findOne({ username: username, }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!bcrypt.compareSync(password, user.password)) {
            console.log("algo pasa con tu password");
        } else {
            return done(null, user);
        }
    })
}))
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect("/login.ejs");
    }
}
app.set("views", __dirname + "/views")
app.set("files", __dirname + "/files")
app.set("view engine", "ejs")

let command = [{
    name: process.platform
}, {
    name: process.version
}, {
    name: process.pid
}, {
    name: process.cwd()
}, {
    name: process.argv
}, {
    name: process.title
}]

let userInfo = []
app.get("/", (req, res) => {
    res.render("index.ejs", {
        userInfo,
        files
    })
})
app.get("/login", (req, res) => {
    res.render("login.ejs")
})
app.get("/signup", (req, res) => {
    res.render("signup.ejs")
})
app.get("/missingpermission", (req, res) => {
    res.render("missingpermission.ejs")
})
app.get("/perfil", isAuth, (req, res) => {
    res.render("perfil.ejs", {
        userInfo
    })
})
app.get('/info', (req, res) => {
    res.render('info.ejs', {
        command
    })
})
app.get("/products", (req, res) => {
    res.render("products.ejs", {
        files
    })
})
app.post("/prodForm", (req, res) => {
    files.push(req.body)
    res.redirect("/")
})
app.post("/signupForm", passport.authenticate('signup.ejs', {
    failureRedirect: '/signup',
}), (req, res) => {
    res.redirect("/")
})
app.post("/loginForm", passport.authenticate("login.ejs", {
    failureRedirect: "/login",
}), async(req, res) => {
    req.session.isAuth = true
    req.session.user = req.body
    res.redirect("/")
})
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send({
                error: error
            })
        } else {
            res.redirect("/");
        }
    })
})

const child = fork("./src/main.js")
app.get("/api/randoms", (req, res) => {
    let number
    if (req.query.cant) {
        number = req.query.cant
    } else {
        number = 100000000
    }
    child.send(number)
    child.on("message", msg => {
        res.send(msg)
    })
})