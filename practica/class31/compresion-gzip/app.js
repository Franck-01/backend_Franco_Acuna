const express = require("express");
const compression = require("compression");

const app = express();

//-Este se puede aplicar a todo y comprime los bytes (en teoria) app.use(compression());

app.get("/saludo", (req, res) => {
    res.send(("hola que tal ").repeat(1000))
})

app.get("/saludoZip", compression(), (req, res) => {
    res.send(("hola que tal ").repeat(1000))
})

app.listen(8080, () => console.log('listening on port 8080'))