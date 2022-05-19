const express = require("express");
const winston = require("winston");

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: "debug.log", level: "debug" }),
        new winston.transports.File({ filename: "errores.log", level: "error" }),
    ]
})

// niveles
// logger.debug("imprimiendo debug");
// logger.info("imprimiendo info");
// logger.warn("imprimiendo warn");
// logger.error("imprimiendo error");


const app = express();

app.get("/", (req, res) => {
    res.send("pagina inicial")
})

app.get("/suma", (req, res) => {
    const { num1, num2 } = req.query;
    if (typeof(num1) !== "undefined" && typeof(num2) !== "undefined") {
        // console.log(`la suma es ${parseInt(num1)+parseInt(num2)}`)
        logger.info(`la suma es ${parseInt(num1)+parseInt(num2)}`);
        res.send(`la suma es ${parseInt(num1)+parseInt(num2)}`)
    } else {
        logger.error("No ingreso los numeros correctos");
        console.log("No ingreso los numeros correctos")
        res.send("No ingreso los numeros correctos")
    }
})

app.listen(8080, () => console.log('listening on port 8080'))