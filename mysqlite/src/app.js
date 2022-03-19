const express = require("express")
const productsManager = require("./manager/productManager")
const { Server } = require("socket.io")

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

const productService = new productsManager();
const io = new Server(server)

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let product = []

app.get("/", (req, res) => {
    res.render("index.ejs", {
        product
    })
})
io.on("connection", async(socket) => {
    console.log("a user connected");
    let products = await productService.getAll();
    io.emit("productLog", products);
    socket.on("sendProduct", async(data) => {
        await productService.add(data);
        let products = await productService.getAll();
        io.emit("productLog", products);
    });
})