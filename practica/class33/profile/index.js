const express = require("express")
const crypto = require("crypto")

const app = express()
const PORT = process.env.PORT || 8080;

const users = {}
app.get("/", (req, res) => {
    res.json({ users })
})

//datos del usuario
app.get("/newUser", (req, res) => {
    let userName = req.query.userName || "";
    let password = req.query.password || "";

    userName = userName.replace(/[!@#$%&*]/g, "")

    if (!userName || !password || users[userName]) {
        return res.sendStatus(400)
    }

    const salt = crypto.randomBytes(120).toString("base64")
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512")

    users[userName] = { salt, hash }
    res.sendStatus(200)
})

//funcion bloqueante-Login

app.get("/auth-bloq", (req, res) => {
    let userName = req.query.userName || ""
    const password = req.query.password || ""

    userName = userName.replace(/[!@#$%&*]/g, "")

    if (!userName || !password || users[userName]) {
        process.exit(1)
    }

    const { salt, hash } = users[userName]
    const encryHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512")

    if (crypto.tiningSafeEqual(hash, encryHash)) {
        res.sendStatus(200)
    } else {
        process.exit(1)
    }
})

//funcion NO bloqueante-login

app.get("/no-auth-bloq", (req, res) => {
    let userName = req.query.userName || ""
    const password = req.query.password || ""

    userName = userName.replace(/[!@#$%&*]/g, "")

    if (!userName || !password || users[userName]) {
        process.exit(1)
    }

    const { salt } = users[userName]
    crypto.pbkdf2(password, salt, 10000, 512, "sha512", (err, hash) => {
        if (users[userName].hash.toString() === hash.toString()) {
            res.sendStatus(200)
        } else {
            process.exit(1)
        }
    })
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT} in process ${process.pid}`) })