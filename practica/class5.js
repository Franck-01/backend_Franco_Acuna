/*/let obj = {};

for (let i = 0; i < 10000; i++) {
    let random = Math.floor(Math.random() * 20 + 1)
    if (obj[random]) {
        obj[random]++
    } else {
        obj[random] = 1
    }
}

//console.log(obj)
let sum = Object.values(obj).reduce((acculumator, current) => acculumator + current)

console.log(sum)
/*/

/////Part 2

const productos = [
    { id: 1, nombre: 'Escuadra', precio: 323.45 },
    { id: 2, nombre: 'Calculadora', precio: 234.56 },
    { id: 3, nombre: 'Globo Terráqueo', precio: 45.67 },
    { id: 4, nombre: 'Paleta Pintura', precio: 456.78 },
    { id: 5, nombre: 'Reloj', precio: 67.89 },
    { id: 6, nombre: 'Agenda', precio: 78.90 }
]
let nombres = productos.map(obj => obj.nombre).join(",")
let total = productos.reduce((accumulator, newObject) => accumulator + newObject.precio, 0)
let agb = total / productos.length

let min = productos[0].precio
let max = productos[0].precio

productos.forEach(producto => {
        if (producto.precio < min) {
            min = producto.precio
        }
        if (producto.precio > max) {
            max = producto.precio
        }
    })
    //console.log(min)
    //console.log(max)
let sendObj = {
        nombres: nombres,
        total: total,
        agb: agb,
        min: min,
        max: max
    }
    //console.log(sendObj)

//const moment = require("moment")

//let date = moment("2022-02-02")

//console.log(date.isValid())
//console.log(date)

const moment = require("moment")

let today = moment()
let cumple = moment("2001-07-05")
console.log(`Hoy es: ${today.format("DD/MM/YYYY")}`)
console.log(`Naci el: ${cumple.format("DD/MM/YYYY")}`)
console.log(`Han pasado ${today.diff(cumple, "years")} años desde que naci`)