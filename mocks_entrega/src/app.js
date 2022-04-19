const express = require("express")
const { normalize, schema } = require("normalizr")
const form = require("./files/principal.json")
const moment = require("moment")
const { Server } = require("socket.io")
const principalManager = require("./manager/PrincipalManager.js")

const principalServices = new principalManager()

const app = express()
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
const io = new Server(server)

app.set("views", __dirname + "/views")
app.set("files", __dirname + "/files")
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let log = []
const generateLog = {
    id: "200",
    name: "Chat general",
    log: log
}
app.get("/", (req, res) => {
    res.render("index.ejs", {
        form
    })
})
app.post("/products", (req, res) => {
    form.push(req.body)
    res.redirect("/")
})

io.on("connection", async socket => {
    console.log("Estas conectado")
    socket.on("sentPrinc", async data => {
        await principalServices.add(data)
        let principal = await principalServices.getAll()
        io.emit("princLog", principal)
        socket.emit("ChatLog", log)
    })
    socket.on('userInfo', (data) => {
        data.time = moment().format("HH:mm DD/MM")
        log.push(data)
        io.emit("ChatLog", log)
        console.log(JSON.stringify(normalizedData, null, '\t'));
    })
})

const author = new schema.Entity("author")
const chatSchema = new schema.Entity("chat", {
    author: author,
    messages: [author]
})
const normalizedData = normalize(generateLog, chatSchema)