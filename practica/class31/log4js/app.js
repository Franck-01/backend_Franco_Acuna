const express = require("express");
const log4js = require("log4js");

log4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerFile: { type: 'file', filename: "info.log" } // esto hace que la informacion que debe generar, lo haga en un archivo aparte
    },
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "debug" },
        consola: { appenders: ["miLoggerConsole"], level: "trace" }, //"level" determina a partir de que nivel te muestra los logs
        archivo: { appenders: ["miLoggerFile"], level: "info" } //ver fila 7
    }
})

const loggerConsole = log4js.getLogger("consola");
const loggerArchivo = log4js.getLogger("archivo")

// niveles
/*loggerConsole.trace("imprimiendo trace");
loggerConsole.debug("imprimiendo debug");
loggerConsole.info("imprimiendo info");
loggerConsole.warn("imprimiendo warn");
loggerConsole.error("imprimiendo error");
loggerConsole.fatal("imprimiendo fatal");*/

loggerArchivo.trace("imprimiendo trace");
loggerArchivo.debug("imprimiendo debug");
loggerArchivo.info("imprimiendo info");
loggerArchivo.warn("imprimiendo warn");
loggerArchivo.error("imprimiendo error");
loggerArchivo.fatal("imprimiendo fatal");

const app = express();

app.get("/", (req, res) => {
    res.send("pagina inicial")
})

app.listen(8080, () => console.log('listening on port 8080'))