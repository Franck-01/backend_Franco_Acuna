const express = require("express")
const productRouter = require("./routes/productRouter")
const cartRouter = require("./routes/cartRouter")

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

app.set('views', __dirname + '/views')
app.set('routes', __dirname + '/routes')
app.set('files', __dirname + '/files')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let carts = [];
let ecommers = []

app.get("/", (req, res) => {
    res.render("index.ejs", {
        carts,
        ecommers
    })
})
app.get("/carts", (req, res) => {
    res.render("carts.ejs", {
        carts
    })
    app.use("/carts", cartRouter)
})
app.get("/products", (req, res) => {
    res.render("products.ejs", {
        ecommers
    })
    app.use("/products", productRouter)
})