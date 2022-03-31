const express = require("express")
const productRouter = require("./routes/productsRoute")
const cartRouter = require("./routes/cartsRoute.js")

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server PORT ${PORT} is ready`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/products", productRouter)
app.use("/carts", cartRouter)