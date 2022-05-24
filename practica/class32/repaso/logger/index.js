const log4js = require("log4js");

log4js.configure({
    appenders: {
        myLoggerConsola: { type: "console" },
        myLoggerFile: { type: "file", filename: "info.log" },
        myLoggerFile2: { type: "file", filename: "info2.log" },
    },

    categories: {
        default: { appenders: ["myLoggerConsola"], level: "trace" },
        consola: { appenders: ["myLoggerConsola"], level: "debug" },
        archivo: { appenders: ["myLoggerFile"], level: "warn" },
        archivo2: { appenders: ["myLoggerFile2"], level: "info" },
        all: { appenders: ["myLoggerConsola", "myLoggerFile"], level: "error" },
    },
})

//**** Niveles **** //
// trace
// debug
// info
// warn
// error
// fatal

const logIn = log4js.getLogger("all")

logIn.trace("Logger trace")
logIn.debug("Logger debug")
logIn.info("Logger info")
logIn.warn("Logger warn")
logIn.error("Logger error")
logIn.fatal("Logger fatal")