const parseArgs = require("minimist");

//node main.js 1 2 3 -m dev -p 8080 -d
console.log(process.argv.slice(2))
    // ['1','2','3','-m','dev','-p','8080', '-d']

const options = { default: { apellido: "chaparro" }, alias: { m: "modo", p: "puerto", d: "debug" } }

const objArguments = parseArgs(process.argv.slice(2), options);
console.log(objArguments)
console.log(objArguments.puerto)