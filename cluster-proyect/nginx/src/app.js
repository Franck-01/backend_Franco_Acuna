const express = require("express")

const app = express()
const PORT = process.argv[2] || 8080
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT} in process ${process.pid}`))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/datos', (req, res) => {
    res.send(`Servidor ${process.pid}`)
})