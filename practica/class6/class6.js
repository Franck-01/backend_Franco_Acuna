const express = require("express")
const moment = require("moment")

const app = express()

const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})

let memo = 0

app.get("/", (req, res) => {
    res.send('<h1 style="color:blue;">Bienvenidos al server</h1>')
})
app.get("/vistas", async(req, res) => {
    memo++
    res.send(`Visitas al server: ${memo}`)
})
app.get('/fyh', (req, res) => {
    let dateTime = moment();
    res.send({
        fyh: dateTime.format('DD/MM/YYYY hh:mm:ss')
    })
})