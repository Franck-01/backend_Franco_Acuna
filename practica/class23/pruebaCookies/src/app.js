import express from "express"
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))

app.use(express.json())
app.use(cookieParser("a6fssafAs87879"))

app.get("/setCookie", (req, res) => {
    res.cookie("session", { username: "Lau", role: "user" }).send("Cookie set")
})
app.get("/getCookie", (req, res) => {
    let cookies = req.cookies
    res.send(cookies)
})
app.get("/setCookieTimer", (req, res) => {
    res.cookie("pitusas", { a: 1, b: 2 }, {
        httpOnly: true,
        maxAge: 10000
    }).send("Cookie with expires set")
})
app.get("/clearCookie", (req, res) => {
    res.clearCookie("pepas").send("No more cookies")
})
app.get("/setSignedCookie", (req, res) => {
    res.cookie("session", { username: "Lau", role: "admin" }, { signed: true }).send("Signed cookie sent")
})
app.get("/getSignedCookie", (req, res) => {
    res.send(req.signedCookies)
})