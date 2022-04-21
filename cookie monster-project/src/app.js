const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const fileStrategy = require("session-file-store")
const productsManager = require("./Managers/productsManagers.js")
const { Server } = require("socket.io")
const files = require("./files/products.json")

const servicesData = new productsManager()
const app = express()
const PORT = process.nextTick.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
const FileStorage = fileStrategy(session)
const io = new Server(server)

app.set("views", __dirname + "/views")
app.set("files", __dirname + "/files")
app.set("view engine", "ejs")

app.use(express.json())
app.use(cookieParser())
app.use(session({
    store: new FileStorage({ path: "./src/sessions", ttl: 3600, retries: 0 }),
    secret: "agdsaf8t54JKFSSH986",
    resave: false,
    saveUninitialized: false
}))

app.get("/", (req, res) => {
    res.render("index.ejs", {
        files,
        users
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
app.get("/user", (req, res) => {
    if (req.session.user) return res.render("user.ejs", {
        users
    })
    let { userCreate } = req.query
    req.session.user = userCreate
    res.redirect("/")
    res.send(`Bienvenido ${userCreate}`)
})

let users = []

app.post("/userLogin", (req, res) => {
    const { userCreate } = req.body
    req.session.user = userCreate
    const userFound = users.find(us => us.userCreate === userCreate)
    if (userFound) {
        console.log("El usuario ya existe")
        res.redirect("/")
    } else {
        users.push(req.body)
        req.session.user = req.body
        res.redirect("/")
        console.log("El usuario se a creado")
    }
})
io.on("connection", async socket => {
    console.log("conection realizada")

    socket.on("sendProducts", async data => {

        await servicesData.add(data)
        let products = await servicesData.getAll()
        io.emit("productsLog", products)
    })
})