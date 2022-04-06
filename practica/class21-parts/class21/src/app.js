import express from "express"
import usersRouter from "./routes/users.js"

const app = express()

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server PORT ${PORT} is ready`))

app.use(express.json())
app.use("/api/usuarios", usersRouter)
server.on("error", error => console.log(error))