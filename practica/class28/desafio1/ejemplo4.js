process.stdout.write("Inicio del programa \n");
process.stdout.write("Ingresa un arreglo de numeros enteros: ");

process.stdin.on('data', data => {
    const entrada = data.toString().trim();
    if (entrada.length) {
        const arreglo = JSON.parse(entrada);
        const suma = arreglo.reduce((acc, i) => acc + parseInt(i), 0);
        //[1,2,"pepe"]=NaN
        console.log(suma)
        if (isNaN(suma)) {
            console.log("datos invalidos")
            console.log({
                error: {
                    description: "tipos invalidos",
                    numeros: arreglo,
                    tipos: arreglo.map(i => typeof(i))
                }
            })
        } else {
            console.log("datos correctos")
            console.log({
                datos: {
                    numeros: arreglo,
                    promedio: suma / arreglo.length,
                    max: Math.max(...arreglo),
                    min: Math.min(...arreglo),
                    ejecutable: process.execPath,
                    pid: process.pid
                }
            })
            process.exit();
        }
    } else {
        console.log("la entrada es invalida")
        console.log({
            error: {
                description: "entrada vacia"
            }
        })
    }
})