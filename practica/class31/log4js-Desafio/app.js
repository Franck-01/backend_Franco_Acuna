const express = require("express");
const log4js = require("log4js");

log4js.configure({
    appenders: {
        consola: { type: "console" },
        miLoggerFile1: { type: 'file', filename: 'debug.log' },
        miLoggerFile2: { type: 'file', filename: "errores.log" }
    },
    categories: {
        default: { appenders: ["consola"], level: "debug" },
        loggerDebug: { appenders: ["miLoggerFile1"], level: "trace" },
        loggerErrors: { appenders: ["miLoggerFile2"], level: "error" }
    }
})

const debugLogs = log4js.getLogger("loggerDebug");
const errorsLogs = log4js.getLogger("loggerErrors");

// niveles
// loggerConsole.trace("imprimiendo trace");
// loggerConsole.debug("imprimiendo debug");
// loggerConsole.info("imprimiendo info");
// loggerConsole.warn("imprimiendo warn");
// loggerConsole.error("imprimiendo error");
// loggerConsole.fatal("imprimiendo fatal");


const app = express();

app.get("/", (req, res) => {
    res.send("pagina inicial")
})

app.get("/suma", (req, res) => {
    const { num1, num2 } = req.query;
    if (typeof(num1) !== "undefined" && typeof(num2) !== "undefined") {
        // console.log(`la suma es ${parseInt(num1)+parseInt(num2)}`)
        debugLogs.info(`la suma es ${parseInt(num1)+parseInt(num2)}`);
        res.send(`la suma es ${parseInt(num1)+parseInt(num2)}`)
    } else {
        errorsLogs.error("No ingreso los numeros correctos");
        console.log("No ingreso los numeros correctos")
        res.send("No ingreso los numeros correctos")
    }
})

app.get("*", (req, res) => {
    errorsLogs.error(`La pagina ${req.url} no existe`);
    res.send("pagina inexistente");
})

app.listen(8080, () => console.log('listening on port 8080'))