const express = require("express")
const session = require("express-session")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
const path = require("path")
const User = require("./models/usersSchema.js")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const productsManager = require("./Managers/productsManagers.js")
const { Server } = require("socket.io")
const files = require("./files/products.json")

const servicesData = new productsManager()
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
const io = new Server(server)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const URL = "mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/create_passport?retryWrites=true&w=majority"
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
const tenMins = 60 * 10
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/create_passport?retryWrites=true&w=majority",
        ttl: tenMins,
    }),
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
const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
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
        res.redirect("/missing");
    }
}
let perfil = []

app.set("views", __dirname + "/views")
app.set("files", __dirname + "/files")
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index.ejs", {
        files,
        perfil
    })
})
app.get("/product", (req, res) => {
    res.render("product.ejs", {
        files
    })
})
app.get("/login", (req, res) => {
    res.render("login.ejs")
})
app.get("/signup", (req, res) => {
    res.render("signup.ejs")
})
app.get("/logout", isAuth, (req, res) => {
    res.render("logout.ejs")
})
app.get("/perfil", isAuth, (req, res) => {
    res.render("perfil.ejs", {
        perfil
    })
})
app.get("/missing", (req, res) => {
    res.render("missing.ejs")
})

app.post("/productsArray", (req, res) => {
    files.push(req.body)
    res.redirect("/product")
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
    res.redirect("/index");
});
io.on("connection", async socket => {
    console.log("conection realizada")

    socket.on("sendProducts", async data => {

        await servicesData.add(data)
        let products = await servicesData.getAll()
        io.emit("productsLog", products)
    })
})