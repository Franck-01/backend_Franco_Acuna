const express = require("express")
const { normalize, schema } = require("normalizr")
const moment = require("moment")
const { Server } = require("socket.io")
const principalManager = require("./manager/PrincipalManager.js")

const principalServices = new principalManager()

const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
const io = new Server(server)

app.use(express.static(__dirname + '/public'))

let log = []
const generateLog = {
    id: "200",
    name: "Chat general",
    log: log
}
io.on("connection", async socket => {
    console.log("Estas conectado")
    let principal = await principalServices.getAll()
    io.emit("princLog", principal)
    socket.emit("ChatLog", log)

    socket.on("sentPrinc", async(data) => {
        await principalServices.add(data)
        let principal = await principalServices.getAll()
        io.emit("princLog", principal)
    })
    socket.on('userInfo', (data) => {
        data.time = moment().format("HH:mm DD/MM")
        log.push(data)
        console.log(JSON.stringify(normalizedData, null, '\t'));
    })
})

const author = new schema.Entity("author")
const chatSchema = new schema.Entity("chat", {
    author: author,
    messages: [author]
})
const normalizedData = normalize(generateLog, chatSchema)