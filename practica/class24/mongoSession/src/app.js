const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const MongoStore = require("connect-mongo")

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Franck01:comandante0-1@backendcluster5701.afwv7.mongodb.net/mongoSession?retryWrites=true&w=majority",
        ttl: 20
    }),
    secret: "comanDEltA0-7",
    resave: false,
    saveUninitialized: false,
}))

app.get("/", (req, res) => {
    req.session.ecos = { a: 3, c: 1 }
    res.send("Sesion inicializada para Mongo")
})