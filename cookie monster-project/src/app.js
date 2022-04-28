const express = require("express")
const session = require("express-session")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const productsManager = require("./Managers/productsManagers.js")
const { Server } = require("socket.io")
const files = require("./files/products.json")
const cookieParser = require("cookie-parser")
const User = require("./models/usersSchema.js")
const { normalize, schema } = require("normalizr")
const moment = require("moment")

const servicesData = new productsManager()
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret: "keyworld",
    resave: true,
    saveUninitialized: true
}))

const URL = "mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/userDBsession?retryWrites=true&w=majority"
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw new Error("No se logro la coneccion")
    console.log("conexion de mongo realizada")
})

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
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
    )
}

passport.use('registro', new LocalStrategy({
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

app.set("views", __dirname + "/views")
app.set("files", __dirname + "/files")
app.set("view engine", "ejs")

let log = []
const generateLog = {
    id: "200",
    name: "Chat general",
    log: log
}

app.get("/", (req, res) => {
    res.render("index.ejs", {
        files
    })
})
app.get("/product", (req, res) => {
    res.render("product.ejs", {
        files
    })
})
app.post("/productsArray", (req, res) => {
    files.push(req.body)
    res.redirect("/product")
})
app.get("/login", (req, res) => {
    res.render("login.ejs")
})
app.post("/signupForm", passport.authenticate('registro', {
    failureRedirect: '/login',
}), (req, res) => {
    res.redirect("/")
})
io.on("connection", async socket => {
    console.log("conexion de socket realizada")
    socket.on("sendProducts", async data => {
        await servicesData.add(data)
        let products = await servicesData.getAll()
        io.emit("productsLog", products)
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