const express = require("express")
const productRouter = require("./routes/productRouter")
const cartRouter = require("./routes/cartRouter")

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

app.use(express.static(__dirname + "/../public"))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/carts", cartRouter)

app.use("/api/products", productRouter)