const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.listen(8080, () => console.log('listening on port 8080'));

app.post('/login', (req, res) => {
    const userLogin = {
        username: "pepe",
        password: "1234"
    }
    jwt.sign({ user: userLogin }, "claveDeCodificacion", (err, token) => {
        if (err) return res.send("error generating token")
        res.json({ token: token })
    })
})

const isValidToken = (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (typeof(headerToken) !== "undefined") {
        const tokenArray = headerToken.split(" ");
        const token = tokenArray[1];
        console.log(token)
        jwt.verify(token, "claveDeCodificacion", (err, tokenDecoded) => {
            if (err) return res.send("invalid token");
            res.json(tokenDecoded)
        })
        next()
    } else {
        res.send("token no valido")
    }
}

app.post("/datos-perfil", isValidToken, (req, res) => {
    res.send("Datos de Pepe")
})

app.post('/modify-profile', isValidToken, (req, res) => {
    res.send("perfil modificado")
})