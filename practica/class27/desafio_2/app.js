const fs = require("fs");

const archivo = process.argv[2];
console.log("archivo: ", archivo);

try {
    const contenido = fs.readFileSync(archivo, 'utf-8');
    console.log(contenido);
} catch (error) {
    console.log(error);
}