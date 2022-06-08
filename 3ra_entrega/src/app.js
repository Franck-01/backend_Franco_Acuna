const express = require("express")
const session = require("express-session")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { fork } = require("child_process")
const dotenv = require("dotenv")
const minimist = require("minimist")
const os = require("os")
const compression = require("compression")
const log4js = require("log4js")
const User = require("./models/usersSchema")
const { normalize, schema } = require("normalizr")
    //const files = require("./files/principal.json")
const moment = require("moment")
const { Server } = require("socket.io")
const principalManager = require("./manager/PrincipalManager.js")

log4js.configure({
    appenders: {
        theLoggerConsole: { type: "console" },
        theLoggerFile: { type: "file", filename: "logs/warns.log" },
        theLoggerFile2: { type: "file", filename: "logs/errors.log" }
    },
    categories: {
        default: { appenders: ["theLoggerConsole"], level: "info" },
        file: { appenders: ["theLoggerFile"], level: "warn" },
        file2: { appenders: ["theLoggerFile2"], level: "error" },
    }
})

let logConsole = log4js.getLogger()
let logWarn = log4js.getLogger("file")
let logError = log4js.getLogger("file2")

const num_CPU = os.cpus().length
dotenv.config()

const options = { default: { modo: "fork" }, alias: { p: "port" } }
const args = minimist(process.argv.slice(2), options)

const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => logConsole.info(`Listening on port ${PORT} in process ${process.pid}`))
const io = new Server(server)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("views", __dirname + "/views")
app.set("files", __dirname + "/files")
app.set("view engine", "ejs")

let log = []
const generateLog = {
    id: "200",
    name: "Chat general",
    log: log
}
app.use(compression())

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
}, async(username, password, done) => {
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
            logConsole.info("invalid password");
        } else {
            return done(null, user);
        }
    })
}))

const URL = process.env.URL

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    try {
        if (err) throw new Error("Unable to Connect")
        logConsole.info("Connect to DB")
    } catch (error) {
        logError.error(error)
        logConsole.error(error)
    }
})
let files = []
app.get('/', (req, res) => {
    res.render("index.ejs", {
        prueba: 0
    })
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
app.get("/login", (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/profile")
    res.render("login.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
app.get("/signup", (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/profile")
    res.render("signup.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
app.get("/logout", isUserLogged, (req, res) => {
    if (req.isAuthenticated()) {
        req.logOut()
        res.render("logout.ejs")
    }
    res.redirect("/")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
app.get("/profile", isUserLogged, (req, res) => {
    res.render("profile.ejs", { user: req.session.passport.user.username })
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
app.get("/userExists", (req, res) => {
    res.render("userExists.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
app.get("/invalidPass", (req, res) => {
    res.render("invalidPass.ejs")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})

app.post("/signupForm", passport.authenticate('signup', {
    failureRedirect: '/invalidPass',
}), async(req, res) => {
    res.redirect("/profile")
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
app.post("/loginForm", passport.authenticate("login", {
    failureRedirect: "/userExists",
}), async(req, res) => {
    req.session.isAuth = true
    req.session.user = req.body
    res.render("profile.ejs", {
        user: req.body.username,
    })
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send({
                error: error,
            });
        } else {
            res.redirect("/");
            logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
        }
    });
    res.redirect("/");
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
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
    logConsole.info(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})

app.get('*', (req, res) => {
    logConsole.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
    logWarn.warn(`${req.method} to ${req.get('host')}${req.originalUrl}`)
})
io.on("connection", async socket => {
    console.log("Estas conectado")
    socket.on("sentPrinc", async data => {
        await principalServices.add(data)
        let principal = await principalServices.getAll()
        io.emit("princLog", principal)
        socket.emit("ChatLog", log)
    })
    socket.on('userInfo', (data) => {
        data.time = moment().format("HH:mm DD/MM")
        log.push(data)
        io.emit("ChatLog", log)
        console.log(JSON.stringify(normalizedData, null, '\t'));
    })
})

const author = new schema.Entity("author")
const chatSchema = new schema.Entity("chat", {
    author: author,
    messages: [author]
})
const normalizedData = normalize(generateLog, chatSchema)