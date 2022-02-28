const express = require("express")
const { Server } = require("socket.io")

const app = express()
const server = app.listen(8080, () => console.log("Welcome to the server"))

app.use(express.static(__dirname + "/public"))

const io = new Server(server)

let log = [];

io.on('connection', socket => {
    console.log("Usuario dectectado");
    socket.broadcast.emit('alert');
    socket.emit('history', log)

    socket.on('message', data => {
        log.push({ userId: socket.id, message: data });
        io.emit('history', log)
    })
})

//probarlo con ejs