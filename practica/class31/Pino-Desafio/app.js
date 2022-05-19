const express = require("express");
const pino = require("pino");

const app = express();

const loggerDebug = pino({
        level: 'debug'
    },
    pino.destination(`${__dirname}/debug.log`)
);
const loggerError = pino({
        level: 'debug'
    },
    pino.destination(`${__dirname}/errores.log`)
);

loggerDebug.info("pino message info");

app.get("/", (req, res) => {
    res.send("pagina inicial")
})

app.get("/suma", (req, res) => {
    const { num1, num2 } = req.query;
    if (typeof(num1) !== "undefined" && typeof(num2) !== "undefined") {
        console.log(`la suma es ${parseInt(num1)+parseInt(num2)}`)
        loggerDebug.info(`la suma es ${parseInt(num1)+parseInt(num2)}`);
        res.send(`la suma es ${parseInt(num1)+parseInt(num2)}`)
    } else {
        loggerError.error("No ingreso los numeros correctos");
        console.log("No ingreso los numeros correctos")
        res.send("No ingreso los numeros correctos")
    }
})

app.get("*", (req, res) => {
    loggerError.error(`La pagina ${req.url} no existe`);
    res.send("pagina inexistente");
})

app.listen(8080, () => console.log('listening on port 8080'))