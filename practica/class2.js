/*
const rango = (nombre) => {
    console.log(`Me llamo ${nombre}`)
}
rango("Rex")

const aumento = (num1, num2) => num1 + num2

const disminuyo = (num3, num4) => num3 - num4

let sumar = aumento(1, 2)
let restar = disminuyo(10, 1)
console.log(`${sumar} o ${restar}`)

const calculo = (num1, num2, callback) => callback(num1, num2);

const suma = (num1, num2) => num1 + num2
const resta = (num1, num2) => num1 - num2
const multi = (num1, num2) => num1 * num2
const division = (num1, num2) => num1 / num2

console.log(calculo(1, 2, suma))

const copiarAr = (nombreAr, callback) => {
        buscarAr(nombreAr, (error, rutaAr) => {
            if (error) {
                callback(error)
            } else {
                leerAr(rutaAr, "utf-8", (error, text) => {
                    if (error) {
                        callback(error)
                    } else {
                        const nombrenuevoAr = `${rutaAr}.copia`
                        escrito(nombrenuevoAr, text, (error) => {
                            if (error) {
                                callback(error)
                            } else {
                                callback(null)
                            }
                        })
                    }
                })
            }
        })
    }

const div = (dividendo, divisor) => {
    return new Promise((res, rej) => {
        if (divisor === 0) {
            erj("No puedo dividir entre 0")
        } else {
            res(dividendo / divisor)
        }
    })
}

div(10, 5)
    .then(result => console.log(result))
    .catch(error => console.log(error))
*/
const writeFire = (path, callback) => {
    return new Promise((res, rej) => {
        console.log("Enviando Archivo...");
        setTimeout(() => res(callback()), 5000)
    })
}
writeFire("/jhgvvjh.hif/kgjhfvjhvg", () => console.log("Archivo enviado"))
console.log("Gracias por su compra")
    /*function saludoAc() {
        console.log("se a activado")
        const busqueda = document.getElementById("command");
        const crear = document.createElement("div");
        const texto = {
            titulo: "a casa platita",
        };
        crear.innerHTML = `
                            <h1>${texto.titulo}</h1>
                            `;
        busqueda.appendChild(crear);
    }*/

/*--boton--
const boton = document.getElementById("command")
boton.addEventListener("click", saludo)

function saludo() {
    console.log("se a activado")
}

function despido() {
    console.log("se a desactivado")
}*/