const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();
//revisar cuantos cores tiene mi computador
const numeroCPUs = os.cpus().length;
const PORT = 8080;

app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++) {
        //codigo
    }
    res.send(`corriendo en el proceso ${process.pid}`);
    cluster.worker.kill();
})
if (cluster.isPrimary) {
    //vamos a crear los clones de ese proceso principal
    for (let i = 0; i < numeroCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`El proceso ${worker.process.pid} ha finalizado`)
        cluster.fork()
    })
} else {
    app.listen(PORT, () => console.log(`el proceso ${process.pid} corre en el puerto ${PORT}`));
}