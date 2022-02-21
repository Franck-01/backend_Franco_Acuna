/*--sincronico

const delay = cant => {
    for (let i = 0; i < cant * 10000000; i++);
}
const tarea = (num, callback) => {
    console.log(`Ejecutando comandos: ${num}`)
    setTimeout(callback,100)
}
tarea(1);
tarea(2);
tarea(3);
tarea(4);
console.log("Tareas Finalizadas")
console.log("iniciando tareas pendientes..")-*/


/*--asincronico

const tarea = (num, callback) => {
    console.log(`Ejecutando comandos: ${num}`)
    setTimeout(callback, 100)
}
console.log("Iniciando ejecucion de tareas del servidor")
tarea(1, () => {
    tarea(2, () => {
        tarea(3, () => {
            tarea(4, () => {
                console.log("Tareas finalizadas")
            });
        });
    });
});
console.log("iniciando tareas pendientes..")

//--clase 4--

const showLetters = (text, callback, timeRun) => {
    let index = 0
    const timer = setInterval(() => {
        if (index < text.length) {
            console.log(text[index]);
            index++;
        } else {
            clearInterval(timer)
            callback()
        }
    }, timeRun)
}
const fin = () => console.log("finalizado");
setTimeout(() => showLetters("Eco-Delta", fin, 500), 0);-*/

const fs = require(`fs`);

const readFile = async(path) => {
    try {
        let data = await fs.promises.readFile(path, "utf-8")
        let object = JSON.parse(data);
        object.contenidoObj.author = "Coder";
        await fs.promises.writeFile("newJson.json", JSON.stringify(object, null, 2))
    } catch (error) {
        console.log(error)
    }
}
readFile("info.json")

/*fs.writeFileSync("ejemplo1.txt", "traer JSON");
console.log("A casa platita");

try {
    let contenido = fs.readFileSync("ejemplo1.txt", "utf-8")
    console.log(contenido);
} catch (error) {
    fs.writeFileSync("ejemplo1.txt", "a vuelto a existir")
}*/


//fs.appendFileSync("Ejemplo2.txt", "Nuevo archivo creado")
//fs.unlinkSync("Ejemplo2.txt")

/*try {
    fs.writeFileSync("practica.txt", new Date().toLocaleString());
    let data = fs.readFileSync("practica.txt", "utf-8");
    console.log(data);
} catch (error) {
    console.log(error)
}*/
/*try {
    fs.readFile("package.json", "utf-8", (error, data) => {
        if (error) throw "error";
        const info = {
            contenidoString: data,
            contenidoObj: JSON.parse(data)
        }
        fs.writeFile("info.json", JSON.stringify(info, null, 2), (error) => {
            if (error) throw "error";
        })
    })
} catch (error) {
    console.log(error)
}

fs.promises.writeFile("archivo.txt", "Hola, bienvenido").then(result => {
    console.log("Finalizado");
}).catch(error => console.log(error))

fs.promises.readFile("fyh.txt", "utf-8").then(data => {
    console.log(data)
}).catch(error => console.log(error))*/