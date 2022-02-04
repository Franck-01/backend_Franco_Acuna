const express = require("express")
const moment = require("moment")
const Administrator = require("./administrator.js")
const userServices = new Administrator

const app = express()

const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})

app.get("/", (req, res) => {
    res.send('<h1 style="color:blue;">Bienvenidos al server</h1>')
})
app.get("/products", (req, res) => {
    userServices.getProduct().then(result => res.send(result))
    userServices.getAll().then(result => res.send(result))
    res.send('<h1 style="color:blue;">sus productos</h1>')
    console.log(userServices.getAll())
})
app.get("/randoms", (req, res) => {
    userServices.randomProduct().then(result => res.send(result))
    res.send('<h1 style="color:blue;">Al azar</h1>')
})