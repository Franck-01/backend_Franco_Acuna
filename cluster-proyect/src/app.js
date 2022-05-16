const express = require("express")
const session = require("express-session")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const dotenv = require("dotenv")
const minimist = require("minimist")
const cluster = require("cluster")
const { fork } = require("child_process")
const { dirname } = require("path")
const { fileURLtoPath } = require("url")
const os = require("os")
const User = require("./models/usersSchema.js")

const num_CPU = os.cpus().length

dotenv.config()
const options = { default: { modo: "fork" }, alias: { p: "port" } }
const args = minimist(process.argv.slice(2), options)

const app = express()
const PORT = args.port || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

switch (args.modo) {
    case "fork":
        const server = app.listen(PORT, () => console.log(`Listening on port ${PORT} in process ${process.pid}`))
        break
    case "cluster":
        if (cluster.isPrimary) {
            console.log(`master ${process.pid} is running`)
            for (let i = 0; 1 < num_CPU; i++) {
                cluster.fork()
            }
            cluster.on("exit", (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`)
            })
        } else {
            const server = app.listen(PORT, () => console.log(`Listening on port ${PORT} in process ${process.pid}`))
            console.log(`worker ${process.pid} started`)
        }
        break
    default:
        break
}

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 30000
    }
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

const isUserLogged = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}

passport.use('signup', new LocalStrategy({
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
passport.use("login", new LocalStrategy({
    passReqToCallback: true,
}, (req, username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, {
            message: "user already exist"
        })
        if (!bcrypt.compareSync(password, user.password)) {
            console.log("invalid password");
        } else {
            return done(null, user);
        }
    })
}))

const URL = process.env.URL

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error("Unable to Connect")
    console.log("Connect to DB")
})

app.get('/', (req, res) => {
    res.render("index.ejs", {
        prueba: 0
    })
})
app.get("/login", (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/profile")
    res.render("login.ejs")
})
app.get("/signup", (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/profile")
    res.render("signup.ejs")
})
app.get("/logout", isUserLogged, (req, res) => {
    if (req.isAuthenticated()) {
        req.logOut()
        res.render("logout.ejs")
    }
    res.redirect("/")
})
app.get("/profile", isUserLogged, (req, res) => {
    res.render("profile.ejs", { user: req.session.passport.user.username })
})
app.get("/userExists", (req, res) => {
    res.render("userExists.ejs")
})
app.get("/invalidPass", (req, res) => {
    res.render("invalidPass.ejs")
})

app.post("/signupForm", passport.authenticate('signup', {
    failureRedirect: '/signup',
}), (req, res) => {
    res.redirect("/")
})
app.post("/loginForm", passport.authenticate("login", {
    failureRedirect: "/login",
}), async(req, res) => {
    req.session.isAuth = true
    req.session.user = req.body
    res.render("index.ejs", {
        userInfo: req.body.username,
    })
})
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send({
                error: error,
            });
        } else {
            res.redirect("/");
        }
    });
    res.redirect("/");
})

app.get("/info", (req, res) => {
    const info = {
        argv: args,
        platform: process.platform,
        version: process.version,
        rss: process.memoryUsage,
        path: process.execPath,
        pid: process.pid,
        folder: process.env.PWD,
        CPUs: num_CPU
    }
    res.send(info)
})

const child = fork("./src/child.js")

app.get("/api/random", (req, res) => {
    let objFinal = []
    let cant = req.query.cant
    child.send(cant || 50000000)
    child.on('message', obj => {
        objFinal = obj
    })

    setTimeout(() => {
        res.json({ PID: process.pid, objFinal })
    }, 3500)
})