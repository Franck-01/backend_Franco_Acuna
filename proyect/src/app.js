const express = require("express")
const productJSON = require("./files/products.json")
const { Server } = require("socket.io")
const productsManager = require("./Managers/productsManagers.js")

const servicesData = new productsManager()
const app = express();
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
const io = new Server(server)

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

let log = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {
        productJSON
    })
})
app.get("/products", (req, res) => {
    res.render("client.ejs", {
        productJSON
    })
})
app.post('/productsSelect', (req, res) => {
    productJSON.push(req.body);
    res.redirect('/products')
})
app.get("/chat", (req, res) => {
    res.render("chat.ejs")
})

io.on("connection", async socket => {
    console.log("conection realizada")

    socket.on("sendProducts", async data => {

        await servicesData.add(data)
        let products = await servicesData.getAll()
        io.emit("productsLog", products)
    })
})
io.on('connection', (socket) => {
    socket.broadcast.emit('newUser')

    socket.on('message', data => {
        log.push(data);
        io.emit('log', log);
    })
    socket.on('registered', data => {
        socket.emit('log', log);
    })
})