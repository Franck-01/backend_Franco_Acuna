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
app.get("/userLogin", (req, res) => {
    if (req.session.user) return res.send("Este usuario ya existe")
    let { user } = req.query
    req.session.user = user
    res.render("user.ejs")
})
app.post("/userLogin", (req, res) => {
    user.push(req.body)
    res.redirect("/")
})
io.on("connection", async socket => {
    console.log("conection realizada")

    socket.on("sendProducts", async data => {

        await servicesData.add(data)
        let products = await servicesData.getAll()
        io.emit("productsLog", products)
    })
})