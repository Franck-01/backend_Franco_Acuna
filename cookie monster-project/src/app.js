const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const fileStrategy = require("session-file-store")
const productsManager = require("./Managers/productsManagers.js")
const { Server } = require("socket.io")
const files = require("./files/products.json")
let multer = require("multer")

const servicesData = new productsManager()
const app = express()
const PORT = process.env.PORT || 8000
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
const FileStorage = fileStrategy(session)
const io = new Server(server)

app.set("views", __dirname + "/views")
app.set("files", __dirname + "/files")
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    store: new FileStorage({ path: "./src/sessions", ttl: 3600, retries: 0 }),
    secret: "agdsaf8t54JKFSSH986",
    resave: false,
    saveUninitialized: false
}))

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
    let user = req.session.user
    console.log(req.session)
    if (user) return res.render("login.ejs")
})

app.post("/login", (req, res) => {
    let data = req.body
    req.session.user = data.username
    const { username } = req.body;
    const userFound = users.find(el => el.username === username);
    if (userFound) {
        console.log("el usuario ya existe")
    } else {
        users.push(req.body);
        req.session.user = req.body;
        res.redirect('/')
    }
    res.send(console.log("ok"))
})
app.get("/user", (req, res) => {
    let user = req.session
    res.send(user)
})
io.on("connection", async socket => {
    console.log("conection realizada")

    socket.on("sendProducts", async data => {

        await servicesData.add(data)
        let products = await servicesData.getAll()
        io.emit("productsLog", products)
    })
})