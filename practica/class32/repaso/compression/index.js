const express = require("express")
const compression = require("compression")
require("dotenv").config()

const app = express()
app.use(compression())

app.get("/", (req, res) => {
    if (process.env.NODE_ENV == "prod") {
        res.send("hola".repeat(1000))
    }
    res.send("hola")
})

app.listen(8080, () => {
    console.log("Server connect")
})