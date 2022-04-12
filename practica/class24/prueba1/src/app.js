import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import fileStrategy from "session-file-store"

const app = express()
const PORT = process.nextTick.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
const FileStorage = fileStrategy(session)

app.use(cookieParser())
app.use(session({
    store: new FileStorage({ path: "./src/sessions", ttl: 3600, retries: 0 }),
    secret: "agdsaf8t54JKFSSH986",
    resave: false,
    saveUninitialized: false,
    /*cookie:{
        maxAge:200000
    }*/
}))

app.get("/", (req, res) => {
    req.session.ecos = 2
    res.send("La sesion a iniciado")
})