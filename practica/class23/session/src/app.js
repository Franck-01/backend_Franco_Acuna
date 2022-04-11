import express from "express"
import session from "express-session"

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "fsadkGIUOYFAKB7yds8987t96",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 300000
    }
}))

app.get("/login", (req, res) => {
    if (req.session.username) return res.send("Ya se hizo el registro")
    let { nombre } = req.query
    req.session.username = nombre
    res.send("Bienvenido")
})

app.get("/current", (req, res) => {
    let user = req.session.username
    if (req.session.contador) {
        req.session.contador++
    } else {
        req.session.contador = 1
    }
    res.send(`El usuario ${user} lleva ${req.session.contador} visitando este sitio`)
})
app.get("/logOut", (req, res) => {
    req.session.destroy(err => {
        if (!err) return res.send("Logged Out")
        res.send({ status: "Error", message: err })
    })
})