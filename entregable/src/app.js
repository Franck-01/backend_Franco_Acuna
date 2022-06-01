const express = require("express")
const productRouter = require("./routes/productRouter")
const cartRouter = require("./routes/cartRouter")

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.get('*', (req, res) => {
    res.send({
        status: "error",
        error: `Couldn't find route ${req.url}`
    })
})