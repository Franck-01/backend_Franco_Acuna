const express = require("express")
const pilotsRouter = require("./routes/pilots")

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/pilots", pilotsRouter)
app.use(express.static(__dirname + "../../public"))
const PORT = 8080

const server = app.listen(PORT, () => console.log("Welcome to server"))