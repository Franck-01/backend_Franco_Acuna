const express = require("express");
const { db } = require("./db.js");
const routerDatos = require("./src/routes/users.route");

const app = express();
app.use(express.json());
app.use("/api/datos", routerDatos);

app.listen(8086, () => {
    console.log("Server ok!");

    //   inicializo la DB
    db.sync({ force: false })
        .then(() => {
            console.log("DB Conectada");
        })
        .catch((err) => {
            console.log("Error de conexion con la DB!");
        });
});